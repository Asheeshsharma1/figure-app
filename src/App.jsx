import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import WomanFigure from "./components/WomanFigure.jsx";

export default function App() {
  const [params, setParams] = useState({
    heightCm: 165,
    bustCm: 90,
    waistCm: 72,
    hipCm: 96,
    shoulderCm: 40,
    legLengthPct: 50,
    armLengthPct: 45
  });

  const setValue = (key) => (e) =>
    setParams((p) => ({ ...p, [key]: Number(e.target.value) }));

  const randomize = () => {
    setParams({
      heightCm: Math.round(150 + Math.random() * 30),
      bustCm: Math.round(78 + Math.random() * 30),
      waistCm: Math.round(58 + Math.random() * 30),
      hipCm: Math.round(82 + Math.random() * 35),
      shoulderCm: Math.round(34 + Math.random() * 12),
      legLengthPct: Math.round(42 + Math.random() * 14),
      armLengthPct: Math.round(40 + Math.random() * 12)
    });
  };

  const savePng = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `figureforge-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold">FigureForge</h1>
          <div className="flex gap-2">
            <button
              onClick={randomize}
              className="px-3 py-1.5 rounded-2xl shadow-sm border hover:shadow"
            >
              Randomize
            </button>
            <button
              onClick={savePng}
              className="px-3 py-1.5 rounded-2xl shadow-sm border hover:shadow"
            >
              Save PNG
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-4">
        <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow bg-white">
          <Canvas camera={{ position: [1.8, 1.8, 2.4], fov: 40 }} shadows>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 2]} intensity={1} castShadow />
            <Environment preset="city" />
            <WomanFigure {...params} />
            <OrbitControls enableDamping makeDefault />
          </Canvas>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow p-4"
        >
          <h2 className="text-lg font-medium mb-3">Enter Measurements</h2>
          <div className="space-y-4">
            {[
              { key: "heightCm", label: "Height (cm)", min: 140, max: 190, step: 1 },
              { key: "bustCm", label: "Bust (cm)", min: 70, max: 120, step: 1 },
              { key: "waistCm", label: "Waist (cm)", min: 50, max: 120, step: 1 },
              { key: "hipCm", label: "Hips (cm)", min: 70, max: 130, step: 1 },
              { key: "shoulderCm", label: "Shoulders (cm)", min: 32, max: 55, step: 1 },
              { key: "legLengthPct", label: "Leg Length (% of height)", min: 40, max: 60, step: 1 },
              { key: "armLengthPct", label: "Arm Length (% of height)", min: 38, max: 55, step: 1 }
            ].map((cfg) => (
              <div key={cfg.key} className="grid grid-cols-6 gap-3 items-center">
                <label className="col-span-3 md:col-span-2 text-sm">{cfg.label}</label>
                <input
                  className="col-span-2 md:col-span-3 w-full"
                  type="range"
                  min={cfg.min}
                  max={cfg.max}
                  step={cfg.step}
                  value={params[cfg.key]}
                  onChange={setValue(cfg.key)}
                />
                <div className="text-right text-sm tabular-nums">{params[cfg.key]}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="max-w-6xl mx-auto p-4 text-xs text-neutral-500 text-center">
        FigureForge – Built with React + @react-three/fiber + drei + Framer Motion
      </footer>
    </div>
  );
}
