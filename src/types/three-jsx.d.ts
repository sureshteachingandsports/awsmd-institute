import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Core elements
      group: ReactThreeFiber.Node<THREE.Group, typeof THREE.Group>;
      mesh: ReactThreeFiber.Node<THREE.Mesh, typeof THREE.Mesh>;

      // Lights
      ambientLight: ReactThreeFiber.Node<THREE.AmbientLight, typeof THREE.AmbientLight>;
      pointLight: ReactThreeFiber.Node<THREE.PointLight, typeof THREE.PointLight>;
      directionalLight: ReactThreeFiber.Node<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      spotLight: ReactThreeFiber.Node<THREE.SpotLight, typeof THREE.SpotLight>;
      hemisphereLight: ReactThreeFiber.Node<THREE.HemisphereLight, typeof THREE.HemisphereLight>;
      rectAreaLight: ReactThreeFiber.Node<THREE.RectAreaLight, typeof THREE.RectAreaLight>;

      // Geometries
      sphereGeometry: ReactThreeFiber.Node<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      planeGeometry: ReactThreeFiber.Node<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
      boxGeometry: ReactThreeFiber.Node<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
      circleGeometry: ReactThreeFiber.Node<THREE.CircleGeometry, typeof THREE.CircleGeometry>;
      coneGeometry: ReactThreeFiber.Node<THREE.ConeGeometry, typeof THREE.ConeGeometry>;
      cylinderGeometry: ReactThreeFiber.Node<THREE.CylinderGeometry, typeof THREE.CylinderGeometry>;
      dodecahedronGeometry: ReactThreeFiber.Node<THREE.DodecahedronGeometry, typeof THREE.DodecahedronGeometry>;
      icosahedronGeometry: ReactThreeFiber.Node<THREE.IcosahedronGeometry, typeof THREE.IcosahedronGeometry>;
      octahedronGeometry: ReactThreeFiber.Node<THREE.OctahedronGeometry, typeof THREE.OctahedronGeometry>;
      ringGeometry: ReactThreeFiber.Node<THREE.RingGeometry, typeof THREE.RingGeometry>;
      tetrahedronGeometry: ReactThreeFiber.Node<THREE.TetrahedronGeometry, typeof THREE.TetrahedronGeometry>;
      torusGeometry: ReactThreeFiber.Node<THREE.TorusGeometry, typeof THREE.TorusGeometry>;
      torusKnotGeometry: ReactThreeFiber.Node<THREE.TorusKnotGeometry, typeof THREE.TorusKnotGeometry>;
      tubeGeometry: ReactThreeFiber.Node<THREE.TubeGeometry, typeof THREE.TubeGeometry>;

      // Materials
      meshStandardMaterial: ReactThreeFiber.Node<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      meshBasicMaterial: ReactThreeFiber.Node<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
      meshDepthMaterial: ReactThreeFiber.Node<THREE.MeshDepthMaterial, typeof THREE.MeshDepthMaterial>;
      meshDistanceMaterial: ReactThreeFiber.Node<THREE.MeshDistanceMaterial, typeof THREE.MeshDistanceMaterial>;
      meshLambertMaterial: ReactThreeFiber.Node<THREE.MeshLambertMaterial, typeof THREE.MeshLambertMaterial>;
      meshMatcapMaterial: ReactThreeFiber.Node<THREE.MeshMatcapMaterial, typeof THREE.MeshMatcapMaterial>;
      meshNormalMaterial: ReactThreeFiber.Node<THREE.MeshNormalMaterial, typeof THREE.MeshNormalMaterial>;
      meshPhongMaterial: ReactThreeFiber.Node<THREE.MeshPhongMaterial, typeof THREE.MeshPhongMaterial>;
      meshPhysicalMaterial: ReactThreeFiber.Node<THREE.MeshPhysicalMaterial, typeof THREE.MeshPhysicalMaterial>;
      meshToonMaterial: ReactThreeFiber.Node<THREE.MeshToonMaterial, typeof THREE.MeshToonMaterial>;
      pointsMaterial: ReactThreeFiber.Node<THREE.PointsMaterial, typeof THREE.PointsMaterial>;
      shadowMaterial: ReactThreeFiber.Node<THREE.ShadowMaterial, typeof THREE.ShadowMaterial>;
      spriteMaterial: ReactThreeFiber.Node<THREE.SpriteMaterial, typeof THREE.SpriteMaterial>;
      rawShaderMaterial: ReactThreeFiber.Node<THREE.RawShaderMaterial, typeof THREE.RawShaderMaterial>;
      shaderMaterial: ReactThreeFiber.Node<THREE.ShaderMaterial, typeof THREE.ShaderMaterial>;
      lineBasicMaterial: ReactThreeFiber.Node<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
      lineDashedMaterial: ReactThreeFiber.Node<THREE.LineDashedMaterial, typeof THREE.LineDashedMaterial>;

      // Misc
      primitive: { object: any; attach?: string };
    }
  }
}

// Extend Three.js with core elements
THREE.Group.prototype.isGroup = true;
THREE.Mesh.prototype.isMesh = true;
THREE.Object3D.prototype.isObject3D = true;

export {};