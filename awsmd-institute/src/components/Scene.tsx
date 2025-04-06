'use client';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import type { Dpr } from '@react-three/fiber';
import { getDeviceCapabilities, getAnimationConfig, debounce } from '../utils/performance';

interface AnimatedSphereProps {
  isLowEnd: boolean;
  isMobile: boolean;
}

const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ isLowEnd, isMobile }) => {
  const sphereRef = useRef<THREE.Group>(null);
  const [isReady, setIsReady] = useState(false);
  const animConfig = useMemo(() => getAnimationConfig({ forceSSR: !isReady }), [isReady]);

  const geometryParams = useMemo(() => ({
    segments: isLowEnd ? 12 : isMobile ? 16 : 32,
    wireframeSegments: isLowEnd ? 6 : isMobile ? 8 : 16,
    rotationSpeed: isLowEnd ? 0.05 : isMobile ? 0.1 : 0.2,
    oscillationSpeed: isLowEnd ? 0.2 : isMobile ? 0.3 : 0.5
  }), [isLowEnd, isMobile]);

  const geometries = useMemo(() => ({
    sphere: new THREE.SphereGeometry(1, geometryParams.segments, geometryParams.segments),
    wireframe: new THREE.SphereGeometry(1.2, geometryParams.wireframeSegments, geometryParams.wireframeSegments)
  }), [geometryParams.segments, geometryParams.wireframeSegments]);

  const materials = useMemo(() => ({
    sphere: new THREE.MeshStandardMaterial({
      color: '#E8D5C4',
      transparent: true,
      opacity: 0.1,
      metalness: 0.8,
      roughness: 0.2
    }),
    wireframe: new THREE.MeshStandardMaterial({
      color: '#E8D5C4',
      wireframe: true,
      transparent: true,
      opacity: 0.2
    })
  }), []);

  useEffect(() => {
    setIsReady(true);
    return () => {
      Object.values(geometries).forEach(geometry => geometry.dispose());
      Object.values(materials).forEach(material => material.dispose());
    };
  }, [geometries, materials]);

  useFrame(({ clock }) => {
    if (sphereRef.current && isReady && !animConfig.reducedMotion) {
      const time = clock.getElapsedTime();
      sphereRef.current.rotation.y = time * geometryParams.rotationSpeed;
      sphereRef.current.rotation.x = Math.sin(time * geometryParams.oscillationSpeed) * 0.2;
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!isLowEnd) {
      e.stopPropagation();
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (!isLowEnd) {
      e.stopPropagation();
      document.body.style.cursor = 'auto';
    }
  };

  return (
    <group 
      ref={sphereRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh geometry={geometries.sphere} material={materials.sphere} />
      <mesh geometry={geometries.wireframe} material={materials.wireframe} />
    </group>
  );
};

interface PerformanceSettings {
  min: number;
  max: number;
}

const Scene: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [deviceCaps, setDeviceCaps] = useState(() => getDeviceCapabilities({ forceSSR: true }));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setDeviceCaps(getDeviceCapabilities({ forceSSR: false }));
    
    if (!deviceCaps.supportsWebGL) {
      setError('WebGL is not supported on your device');
      return;
    }

    const handleResize = debounce(() => {
      setDeviceCaps(getDeviceCapabilities({ forceSSR: false }));
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dpr = useMemo<Dpr>(() => {
    if (deviceCaps.isLowEnd) {
      return [0.5, 0.75];
    }
    if (deviceCaps.isMobile) {
      return [0.75, 1];
    }
    return [1, 2];
  }, [deviceCaps]);

  const performanceSettings = useMemo<PerformanceSettings>(() => ({
    min: deviceCaps.isLowEnd ? 0.3 : deviceCaps.isMobile ? 0.5 : 0.75,
    max: deviceCaps.isLowEnd ? 0.5 : deviceCaps.isMobile ? 0.75 : 1,
  }), [deviceCaps]);

  const canvasSettings = useMemo(() => ({
    gl: {
      antialias: !deviceCaps.isLowEnd,
      powerPreference: deviceCaps.isLowEnd ? 'low-power' as const : 'high-performance' as const,
      alpha: true,
    },
    camera: { position: [0, 0, 5] as [number, number, number] },
    style: { background: 'transparent' as const }
  }), [deviceCaps.isLowEnd]);

  const starsSettings = useMemo(() => ({
    radius: 50,
    depth: 50,
    count: deviceCaps.isLowEnd ? 300 : deviceCaps.isMobile ? 500 : 1000,
    factor: 4,
    saturation: 0,
    fade: true,
    speed: deviceCaps.isLowEnd ? 0.3 : deviceCaps.isMobile ? 0.5 : 1
  }), [deviceCaps.isLowEnd, deviceCaps.isMobile]);

  if (!mounted) return null;
  if (error) return <div className="w-full h-screen flex items-center justify-center text-accent/70">{error}</div>;

  return (
    <div className="w-full h-screen">
      <Canvas
        {...canvasSettings}
        dpr={dpr}
        performance={performanceSettings}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {!deviceCaps.isLowEnd && (
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
        )}
        
        <Stars {...starsSettings} />
        
        <AnimatedSphere 
          isLowEnd={deviceCaps.isLowEnd} 
          isMobile={deviceCaps.isMobile} 
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={deviceCaps.isLowEnd ? 0.2 : deviceCaps.isMobile ? 0.3 : 0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene;