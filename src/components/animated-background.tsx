"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

interface Bubble {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const AnimatedBackground = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(107, 142, 110, 0.2)",
      "rgba(107, 142, 110, 0.3)",
      "rgba(107, 142, 110, 0.1)",
      "rgba(107, 142, 110, 0.25)",
    ];

    const generateBubbles = () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: `${Math.random() * 100}vw`,
        y: `${Math.random() * 100}vh`,
        size: Math.random() * 100 + 50,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        color: colors[i % colors.length],
      }));

    setBubbles(generateBubbles());
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
};

export { AnimatedBackground };
