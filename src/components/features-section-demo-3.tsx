"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { motion } from "motion/react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Track issues effectively",
      description:
        "Track and manage your project issues with ease using our intuitive interface.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Capture pictures with AI",
      description:
        "Capture stunning photos effortlessly using our advanced AI technology.",
      skeleton: <SkeletonTwo />,
      className: "col-span-1 lg:col-span-2 border-b dark:border-neutral-800",
    },
    {
      title: "Watch our AI on YouTube",
      description:
        "Whether it's you or Tyler Durden, you can get to know about our product on YouTube.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Deploy in seconds",
      description:
        "With our blazing fast, state-of-the-art cloud services (read AWS) – you can deploy your model in seconds.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <section className="relative z-20 mx-auto max-w-7xl py-10 lg:py-40">
      <div className="px-8 text-center">
        <h4 className="mx-auto max-w-5xl text-3xl font-medium tracking-tight text-black dark:text-white lg:text-5xl lg:leading-tight">
          Packed with thousands of features
        </h4>
        <p className="mx-auto my-4 max-w-2xl text-sm font-normal text-neutral-500 dark:text-neutral-300 lg:text-base">
          From image generation to video generation, Everything AI has APIs for
          literally everything — it can even create this website copy for you.
        </p>
      </div>

      <div className="relative mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 rounded-md xl:border dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative overflow-hidden p-4 sm:p-8", className)}>
    {children}
  </div>
);

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
  <p className="mx-auto max-w-5xl text-left text-xl font-semibold tracking-tight text-black dark:text-white md:text-2xl md:leading-snug">
    {children}
  </p>
);

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => (
  <p className="my-2 mx-0 max-w-sm text-left text-sm font-normal text-neutral-500 dark:text-neutral-300 md:text-base">
    {children}
  </p>
);

/* ===============================
   🎨 SkeletonOne
   =============================== */
export const SkeletonOne = () => (
  <div className="relative flex h-full gap-10 px-2 py-8">
    <div className="group mx-auto h-full w-full bg-white p-5 shadow-2xl dark:bg-neutral-900">
      <img
        src="/linear.webp"
        alt="Feature preview"
        width={800}
        height={800}
        className="aspect-square h-full w-full rounded-sm object-cover object-left-top"
      />
    </div>

    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 bg-gradient-to-b from-white via-transparent to-transparent dark:from-black" />
  </div>
);

/* ===============================
   🎬 SkeletonThree
   =============================== */
export const SkeletonThree = () => (
  <a
    href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
    target="_blank"
    rel="noopener noreferrer"
    className="group/image relative flex h-full gap-10"
  >
    <div className="group relative h-full w-full bg-transparent dark:bg-transparent">
      <IconBrandYoutubeFilled className="absolute inset-0 z-10 m-auto h-20 w-20 text-red-500" />
      <img
        src="https://assets.aceternity.com/fireship.jpg"
        alt="YouTube preview"
        width={800}
        height={800}
        className="aspect-square h-full w-full rounded-sm object-cover object-center transition-all duration-200 group-hover/image:blur-md"
      />
    </div>
  </a>
);

/* ===============================
   🧠 SkeletonTwo
   =============================== */
export const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop",
  ];

  const imageVariants = {
    whileHover: { scale: 1.1, zIndex: 100 },
    whileTap: { scale: 1.1, zIndex: 100 },
  };

  return (
    <div className="relative flex h-full flex-col items-start gap-10 overflow-hidden p-8">
      <div className="flex -ml-20 flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={`images-first-${idx}`}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{ rotate: Math.random() * 20 - 10 }}
            className="mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <img
              src={image}
              alt="AI-generated example"
              width={500}
              height={500}
              className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={`images-second-${idx}`}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{ rotate: Math.random() * 20 - 10 }}
            className="mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <img
              src={image}
              alt="AI-generated example"
              width={500}
              height={500}
              className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r from-white to-transparent dark:from-black" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 bg-gradient-to-l from-white to-transparent dark:from-black" />
    </div>
  );
};

/* ===============================
   🌍 SkeletonFour (Globe)
   =============================== */
export const SkeletonFour = () => (
  <div className="relative mt-10 flex h-60 flex-col items-center bg-transparent dark:bg-transparent md:h-60">
    <Globe className="absolute -bottom-80 -right-10 md:-bottom-72 md:-right-10" />
  </div>
);

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
