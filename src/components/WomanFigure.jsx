import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function circumferenceToScale(valueCm, baseCm) {
  return clamp(valueCm / baseCm, 0.6, 1.8);
}

export default function WomanFigure({ heightCm, bustCm, waistCm, hipCm, shoulderCm, legLengthPct, armLengthPct }) {
  const REF = useMemo(() => ({ height: 165, bust: 90, waist: 72, hip: 96, shoulder: 40 }), []);

  const scaleY = clamp(heightCm / REF.height, 0.7, 1.4);
  const bustScale = circumferenceToScale(bustCm, REF.bust);
  const waistScale = circumferenceToScale(waistCm, REF.waist);
  const hipScale = circumferenceToScale(hipCm, REF.hip);
  const shoulderScale = circumferenceToScale(shoulderCm, REF.shoulder);

  const torsoPct = 0.52;
  const legPct = clamp(legLengthPct / 100, 0.4, 0.6);
  const armPct = clamp(armLengthPct / 100, 0.35, 0.55);

  const group = useRef();
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002; // gentle auto-rotate
    }
  });

  return (
    <group ref={group} scale={[1, scaleY, 1]}>
      {/* Hips / Pelvis */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.32, 0.2, 8, 16]} />
        <meshStandardMaterial roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Hip volume influencer */}
      <mesh scale={[hipScale, 1, hipScale]} position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial transparent opacity={0.95} />
      </mesh>

      {/* Waist */}
      <mesh scale={[waistScale * 0.85, 0.6, waistScale * 0.85]} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial />
      </mesh>

      {/* Chest / Bust */}
      <mesh position={[0, 1.3, 0]} scale={[bustScale, 0.9, bustScale]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, 1.55, 0]} scale={[shoulderScale * 1.2, 0.35, 0.9]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>

      {/* Neck + Head */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.16, 24]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial />
      </mesh>

      {/* Legs */}
      <group position={[0, -0.45, 0]} scale={[1, legPct / 0.5, 1]}>
        <mesh position={[-0.15, -0.3, 0]}>
          <capsuleGeometry args={[0.12, 0.9, 8, 16]} />
          <meshStandardMaterial />
        </mesh>
        <mesh position={[0.15, -0.3, 0]}>
          <capsuleGeometry args={[0.12, 0.9, 8, 16]} />
          <meshStandardMaterial />
        </mesh>
      </group>

      {/* Arms */}
      <group position={[0, 1.45, 0]} scale={[1, armPct / 0.45, 1]}>
        <mesh position={[-0.55, -0.05, 0]} rotation={[0, 0, 0.1]}>
          <capsuleGeometry args={[0.08, 0.7, 8, 16]} />
          <meshStandardMaterial />
        </mesh>
        <mesh position={[0.55, -0.05, 0]} rotation={[0, 0, -0.1]}>
          <capsuleGeometry args={[0.08, 0.7, 8, 16]} />
          <meshStandardMaterial />
        </mesh>
      </group>
    </group>
  );
}
