"use client";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { PixelImage } from "@/components/ui/pixel-image";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";

export default function SVGMaskEffectDemo() {
  return (
    <section id="Home" className="py-20 px-10">
      <div className="flex items-center justify-center gap-10">
        <div className="hidden lg:block">
          <PixelImage
            src="/images/hero.webp"
            customGrid={{ rows: 8, cols: 8 }}
            grayscaleAnimation
          />
        </div>
        <div className="grid gap-5 px-5 text-center w-fit">
          <TypingAnimation
            delay={1750}
            typeSpeed={25}
            showCursor={false}
            className="font-inter text-xl sm:text-2xl bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent font-bold md:text-4xl"
          >
            Empowering Businesses to Grow with Smart Marketing
          </TypingAnimation>

          <TextAnimate
            className="text-center text-xl text-text md:text-2xl font-openSans"
            delay={3.2}
            duration={1.5}
            animation="blurIn"
            as="h1"
            once
          >
            We craft data-driven marketing strategies that help brands increase
            visibility, attract the right audience, and convert clicks into
            loyal customers.
          </TextAnimate>

          <TextAnimate
            className=" text-lg bg-gradient-to-r from-grad-4  to-grad-2 bg-clip-text text-transparent"
            animation="scaleUp"
            by="text"
            delay={5}
            once
          >
            Let’s accelerate your growth today
          </TextAnimate>
          <BlurFade delay={5.5}>
            <div className="flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="cursor-pointer bg-transparent text-text flex items-center space-x-2"
              >
                <Link href={"tel:+201148620380"}>
                  <span>Book Your Free Consultation</span>
                </Link>
              </HoverBorderGradient>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
