import { cn } from "@/lib/utils";
import {
  IconChartBar,
  IconTarget,
  IconReport,
  IconHeadset,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Data-Backed Strategies",
      description: "Every decision is supported by real insights",
      icon: <IconChartBar size={60} />,
    },
    {
      title: "ROI-Focused Campaigns",
      description: "We focus on measurable results, not empty promises",
      icon: <IconTarget size={60} />,
    },
    {
      title: "Transparent Reporting",
      description: "Clear analytics and monthly performance updates",
      icon: <IconReport size={60} />,
    },
    {
      title: "Dedicated Support",
      description: "Our team is always ready to assist and optimize",
      icon: <IconHeadset size={60} />,
    },
  ];

  return (
    <section id="Features" className="my-40">
      <div>
        <h1 className="bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent text-xl md:text-3xl text-center font-bold font-inter">
          Why Businesses Choose Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col px-5 lg:border-r  py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t  from-grad-4/30 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-grad-4/30 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-grad-4 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block bg-gradient-to-r from-grad-4  to-grad-2 bg-clip-text text-transparent">
          {title}
        </span>
      </div>
      <p className="text-sm text-text max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
