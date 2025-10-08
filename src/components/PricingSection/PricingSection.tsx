"use client";
import { motion } from "framer-motion";
import { IconRocket, IconTrendingUp, IconCrown } from "@tabler/icons-react";
import { BorderBeam } from "@/components/ui/border-beam";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      title: "Starter Plan",
      description: "Ideal for small businesses building their online presence.",
      icon: <IconRocket size={48} className="text-blue-600 mb-4" />,
    },
    {
      title: "Growth Plan",
      description: "For companies ready to scale their reach and conversions.",
      icon: <IconTrendingUp size={48} className="text-emerald-600 mb-4" />,
    },
    {
      title: "Premium Plan",
      description:
        "Complete marketing management with detailed performance reports.",
      icon: <IconCrown size={48} className="text-amber-500 mb-4" />,
    },
  ];

  return (
    <section
      id="Pricing"
      className="w-full my-40 py-24 px-6 md:px-16 text-center"
    >
      {/* العنوان الرئيسي */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl md:text-3xl font-bold mb-12 bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent font-inter"
      >
        Flexible Plans for Every Business
      </motion.h2>

      <div className="flex justify-center items-center flex-wrap gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="rounded-2xl relative overflow-hidden w-[330px] border p-8 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center">
              {plan.icon}
              <h3 className="text-lg md:text-2xl font-semibold mb-4 bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent">
                {plan.title}
              </h3>
              <p className="text-text mb-6">{plan.description}</p>
              <Link
                className="w-full py-3 cursor-pointer bg-gradient-to-r from-grad-4 to-grad-2 text-white rounded-xl font-medium hover:opacity-90 transition"
                href={"#Contact"}
              >
                <button>Get Started Today</button>
              </Link>
            </div>{" "}
            <BorderBeam
              duration={6}
              size={400}
              className="from-transparent via-grad-4 to-transparent"
            />
            <BorderBeam
              duration={6}
              delay={3}
              size={400}
              borderWidth={2}
              className="from-transparent via-grad-2 to-transparent"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
