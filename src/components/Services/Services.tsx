"use client";

import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// TypeScript interfaces
interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

// Services data
const servicesData = [
  {
    title: "Social Media Marketing",
    description:
      "Build a consistent online presence that connects with your audience",
    image: "/images/SocialMediaMarketing.webp",
  },
  {
    title: "Paid Advertising (Meta, Google, TikTok)",
    description: "Drive quality traffic and measurable ROI",
    image: "/images/PaidAdvertising.webp",
  },
  {
    title: "SEO & Content Strategy",
    description: "Increase your organic visibility and authority",
    image: "/images/SEOContentStrategy.webp",
  },
  {
    title: "Website Development",
    description:
      "Convert visitors into clients through high-performing websites",
    image: "/images/WebsiteDevelopment.webp",
  },
] as const;

// Service Card Component
const ServiceCard = ({
  title,
  description,
  image,
  index,
}: ServiceCardProps) => {
  // أنيميشن دخول لكل كارت على حدة (مرة واحدة)
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
        delay: index * 0.12, // تأخير متسلسل
      },
    },
  };

  return (
    <motion.div
      tabIndex={0}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative h-[456px] rounded-xl shadow-md hover:shadow-xl focus:shadow-xl overflow-hidden border border-text/10"
    >
      {/* Background Image & Overlay */}
      <div className="absolute h-[60%] group-hover:h-full group-focus:h-full duration-300 transition-height inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover ease-out "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="relative p-6 ">
          <div className=" absolute transition-height group-hover:h-0 group-focus:h-0 h-full w-full bottom-0 left-0 z-[-1]"></div>
          <h3 className="mb-3 text-xl font-bold text-text group-hover:bg-gradient-to-r group-hover:from-grad-4 group-hover:to-grad-2 group-hover:bg-clip-text group-hover:text-transparent group-focus:bg-gradient-to-r group-focus:from-grad-4 group-focus:to-grad-2 group-focus:bg-clip-text group-focus:text-transparent transition-colors duration-300">
            <p
              className="hover:no-underline"
              aria-label={`اعرف المزيد عن ${title}`}
            >
              {title}
            </p>
          </h3>
          <p className="mb-6 text-right text-sm leading-relaxed transition-colors duration-300 text-text group-hover:text-light group-focus:text-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Specialties Section Component
const SpecialtiesSection = () => {
  return (
    <section
      className="py-20 relative overflow-hidden my-20"
      dir="rtl"
      lang="ar"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center mb-12"
        >
          <h1 className="bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent text-xl md:text-3xl text-center font-bold font-inter">
            Our Services
          </h1>
        </motion.div>

        {/* Services Grid - كل كارت له أنيميشن دخول منفصل */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
