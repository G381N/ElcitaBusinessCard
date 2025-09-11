"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-background">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blurry-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsla(125, 40%, 80%, 0.3)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsla(140, 50%, 60%, 0.3)", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsla(140, 70%, 45%, 0.3)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsla(120, 60%, 98%, 0.3)", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g filter="url(#blurry-filter)">
          <motion.circle
            cx="20vw"
            cy="30vh"
            r="200"
            fill="url(#grad1)"
            animate={{
              cx: [null, "80vw", "20vw"],
              cy: [null, "70vh", "30vh"],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.circle
            cx="80vw"
            cy="60vh"
            r="250"
            fill="url(#grad2)"
            animate={{
              cx: [null, "30vw", "80vw"],
              cy: [null, "20vh", "60vh"],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
           <motion.ellipse
            cx="50vw"
            cy="50vh"
            rx="300"
            ry="150"
            fill="url(#grad1)"
            animate={{
              rotate: [0, 360],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
};

export { AnimatedBackground };
