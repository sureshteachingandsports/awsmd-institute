/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />

import { ThreeElements } from '@react-three/fiber';
import { Object3DNode } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      meshBasicMaterial: Object3DNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
      lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;
      points: Object3DNode<THREE.Points, typeof THREE.Points>;
      primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
      spotLight: Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    }
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
    sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
    meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
    meshBasicMaterial: Object3DNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
    lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;
    points: Object3DNode<THREE.Points, typeof THREE.Points>;
    primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
    spotLight: Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
    directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
  }
}

export {};