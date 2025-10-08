"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";
import { Tabs } from "../ui/tabs";

const content = [
  {
    title: "Social Media Marketing",
    description:
      "Build a consistent online presence that connects with your audience",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/images/SocialMediaMarketing.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Paid Advertising (Meta, Google, TikTok)",
    description: "Drive quality traffic and measurable ROI",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/images/PaidAdvertising.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "SEO & Content Strategy",
    description: "Increase your organic visibility and authority",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/images/SEOContentStrategy.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Website Development",
    description:
      "Convert visitors into clients through high-performing websites",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/images/WebsiteDevelopment.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "",
    description: "",
    content: <div></div>,
  },
];

const tabs = [
  {
    title: "Social Media Marketing",
    value: "Social Media Marketing",
    content: (
      <div className="w-full max-w-xl grid gap-4 relative rounded-2xl p-5 font-bold text-text bg-gradient-to-br from-grad-4 to-grad-2">
        <p className="text-md text-shadow-xs sm:text-xl">
          Build a consistent online presence that connects with your audience
        </p>
        <Image
          src="/images/SocialMediaMarketing.webp"
          alt="dummy image"
          width="300"
          height="300"
          className="object-cover object-center aspect-square rounded-xl mx-auto"
        />
      </div>
    ),
  },
  {
    title: "Paid Advertising",
    value: "Paid Advertising",
    content: (
      <div className="w-full max-w-xl grid gap-4 relative rounded-2xl p-5 font-bold text-text bg-gradient-to-br from-grad-4 to-grad-2">
        <p className="text-md text-shadow-xs sm:text-xl">
          Drive quality traffic and measurable ROI
        </p>
        <Image
          src="/images/PaidAdvertising.webp"
          alt="dummy image"
          width="300"
          height="300"
          className="object-cover object-center aspect-square rounded-xl mx-auto"
        />
      </div>
    ),
  },
  {
    title: "SEO & Content Strategy",
    value: "SEO & Content Strategy",
    content: (
      <div className="w-full max-w-xl grid gap-4 relative rounded-2xl p-5 font-bold text-text bg-gradient-to-br from-grad-4 to-grad-2">
        <p className="text-md text-shadow-xs sm:text-xl">
          Increase your organic visibility and authority
        </p>
        <Image
          src="/images/SEOContentStrategy.webp"
          alt="dummy image"
          width="300"
          height="300"
          className="object-cover object-center aspect-square rounded-xl mx-auto"
        />
      </div>
    ),
  },
  {
    title: "Website Development",
    value: "Website Development",
    content: (
      <div className="w-full max-w-xl grid gap-4 relative rounded-2xl p-5 font-bold text-text bg-gradient-to-br from-grad-4 to-grad-2">
        <p className="text-md text-shadow-xs sm:text-xl">
          Convert visitors into clients through high-performing websites
        </p>
        <Image
          src="/images/WebsiteDevelopment.webp"
          alt="dummy image"
          width="300"
          height="300"
          className="object-cover object-center aspect-square rounded-xl mx-auto"
        />
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <section id="Services" className="my-40">
      <div>
        <div className="w-full py-4 hidden md:block">
          <StickyScroll content={content} />
        </div>
        <div className=" md:hidden h-[30rem] px-10  [perspective:1000px] relative flex flex-col max-w-2xl mx-auto w-full items-start justify-start pb-40">
          <Tabs
            tabClassName="text-xs font-bold text-text cursor-pointer"
            activeTabClassName="bg-gradient-to-r from-grad-4 to-grad-2"
            tabs={tabs}
          />
        </div>
      </div>
    </section>
  );
}
