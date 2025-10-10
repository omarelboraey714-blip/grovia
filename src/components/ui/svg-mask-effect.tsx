"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateMousePosition = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", updateMousePosition);

    return () => {
      container.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const maskSize = isHovered ? revealSize : size;
  const maskPosition =
    mousePosition.x && mousePosition.y
      ? `${mousePosition.x - maskSize / 2}px ${
          mousePosition.y - maskSize / 2
        }px`
      : "0px 0px";

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative h-screen", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-black text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-white"
        animate={{
          maskPosition,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { duration: 0.15, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold"
        >
          {children}
        </div>
      </motion.div>

      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </motion.div>
  );
};
