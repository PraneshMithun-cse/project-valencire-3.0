"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Floating particle field ─── */
const count = 220;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 28;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.012;
    ref.current.rotation.x = Math.sin(t * 0.008) * 0.04;
  });

  return (
    <points ref={ref} geometry={particleGeometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.025}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Slow-rotating wireframe octahedron (decorative) ─── */
function FloatingGeo() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.09;
    meshRef.current.rotation.y = t * 0.13;
    meshRef.current.rotation.z = t * 0.04;
    meshRef.current.position.y = Math.sin(t * 0.45) * 0.35;
  });

  return (
    <mesh ref={meshRef} position={[4.5, 0.5, -4]} scale={[1.8, 2.4, 1.8]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.05}
        wireframe
      />
    </mesh>
  );
}

/* ─── Second smaller geo, offset ─── */
function FloatingGeo2() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = -t * 0.07;
    meshRef.current.rotation.y = -t * 0.1;
    meshRef.current.position.y = Math.cos(t * 0.35) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[-5, -1, -5]} scale={[1.2, 1.2, 1.2]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.04}
        wireframe
      />
    </mesh>
  );
}

/* ─── Responsive camera ─── */
function Camera() {
  const { viewport, camera } = useThree();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    (camera as THREE.PerspectiveCamera).fov = viewport.width < 6 ? 70 : 55;
    camera.updateProjectionMatrix();
  }, [viewport.width, camera]);
  return null;
}

export default function ThreeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <Camera />
      <ParticleField />
      <FloatingGeo />
      <FloatingGeo2 />
    </Canvas>
  );
}
