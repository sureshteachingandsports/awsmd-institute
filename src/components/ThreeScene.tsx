'use client';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

const ThreeScene = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene position={[0, 0, 0]} scale={1} />
      </Canvas>
    </div>
  );
};

export default ThreeScene; 