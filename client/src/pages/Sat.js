import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Earth() {
  const earthRef = useRef();
  const colorMap = useLoader(TextureLoader, "/earth.jpg");
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    earthRef.current.rotation.y += 0.001;
  });

  return (
    <mesh
      ref={earthRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]} // Effetto di zoom quando il mouse passa sopra
    >
      <sphereGeometry args={[1, 50, 50]} />
      <meshPhongMaterial
        map={colorMap}
        emissiveMap={colorMap}
        emissiveIntensity={hovered ? 1 : 0}
      />
    </mesh>
  );
}

function EarthPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />{" "}
        {/* Aggiungi una luce puntiforme aggiuntiva */}
        <pointLight position={[-5, -5, -5]} intensity={1} color="blue" />{" "}
        {/* Aggiungi un'altra luce puntiforme */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={5}
          saturation={0}
          fade
        />
        <Earth />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default EarthPage;
