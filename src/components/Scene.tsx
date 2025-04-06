'use client';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { getDeviceCapabilities, getAnimationConfig, debounce } from '../utils/performance';
import { Group, Mesh } from 'three';
import { Suspense } from 'react';

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

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position: [number, number, number];
    fov?: number;
  };
}

export default function Scene({ children, className, camera = { position: [0, 0, 1], fov: 75 } }: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={camera}
        dpr={[1, 2]} // Responsive pixel ratio
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}