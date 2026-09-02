import React, { Component, useMemo, memo } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';

/**
 * Texture Error Boundary: Catches texture loading failures gracefully without crashing WebGL context
 */
class TextureErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('⚠️ Artwork texture loading prevented WebGL crash:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * 3D Notebook Component:
 * - Loads exact scene.gltf geometry (nodes.Object_2.geometry) and material (materials.Notebook_Black)
 * - Projects user uploaded artwork onto the cover with zero context loss
 */
function Notebook({ imageUrl, uploadedImage, color, ...props }) {
  const { nodes, materials } = useGLTF('/model/scene.gltf');
  const activeImage = uploadedImage || imageUrl;

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* 1. Main Notebook Mesh (Cover, Spine & Pages) */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Notebook_Black}
        >
          {color && (
            <meshStandardMaterial 
              attach="material" 
              color={color} 
              roughness={0.35} 
              metalness={0.05} 
            />
          )}
        </mesh>

        {/* 2. Custom Artwork Layer with Error Boundary (Crash-Free, Safe) */}
        {activeImage && (
          <TextureErrorBoundary>
            <ArtworkDecalLayer imageUrl={activeImage} />
          </TextureErrorBoundary>
        )}
      </group>
    </group>
  );
}

// Sub-component for Cover Artwork with stable memoized texture loading
const ArtworkDecalLayer = memo(function ArtworkDecalLayer({ imageUrl }) {
  const texture = useTexture(imageUrl);

  // Configure texture parameters once per texture instance
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.anisotropy = 4;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
    }
  }, [texture]);

  return (
    <mesh
      position={[0, 0.435, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[5.2, 5.2]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
        roughness={0.2}
        metalness={0.0}
        polygonOffset={true}
        polygonOffsetFactor={-2}
        polygonOffsetUnits={-2}
        depthTest={true}
      />
    </mesh>
  );
});

// Preload model
useGLTF.preload('/model/scene.gltf');

export default memo(Notebook);
