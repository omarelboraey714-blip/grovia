"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!scope.current) return;
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [animate, filter, duration, scope]);

  const renderWords = () => (
    <motion.span ref={scope} className="inline-block">
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0 inline-block text-text"
          style={{
            filter: filter ? "blur(10px)" : "none",
            marginRight: "0.25em",
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );

  return (
    <span className={cn("inline-block font-bold", className)}>
      <span className="block mt-4 text-text text-2xl leading-snug tracking-wide">
        {renderWords()}
      </span>
    </span>
  );
};
