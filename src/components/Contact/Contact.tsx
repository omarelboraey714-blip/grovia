"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input, Textarea } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconMail, IconPhone, IconSend } from "@tabler/icons-react";
import { BorderBeam } from "@/components/ui/border-beam";
import Link from "next/link";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Message sent!");
  };

  return (
    <section id="Contact" className="my-40">
      <div className="mx-auto w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent font-inter ">
          Let’s Discuss Your Next Growth Move
        </h2>
        <p className="mt-2 max-w-sm text-sm text-text">
          Fill in the form or contact us directly — our team will reach out
          within 24 hours to schedule your consultation.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* الاسم الكامل */}
          <LabelInputContainer className="mb-4 ">
            <Label className="text-text" htmlFor="name">
              Full Name
            </Label>
            <Input
              className="bg-input text-text"
              id="name"
              placeholder="John Doe"
              type="text"
            />
          </LabelInputContainer>

          {/* البريد الإلكتروني */}
          <LabelInputContainer className="mb-4">
            <Label className="text-text" htmlFor="email">
              Email Address
            </Label>
            <Input
              className="bg-input text-text"
              id="email"
              placeholder="you@example.com"
              type="email"
            />
          </LabelInputContainer>

          {/* رقم الهاتف */}
          <LabelInputContainer className="mb-4">
            <Label className="text-text" htmlFor="phone">
              Phone Number
            </Label>
            <Input
              className="bg-input text-text"
              id="phone"
              placeholder="+1 234 567 890"
              type="tel"
            />
          </LabelInputContainer>

          {/* الرسالة */}
          <LabelInputContainer className="mb-8">
            <Label className="text-text" htmlFor="message">
              Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project or goals..."
              className="bg-input text-text"
            />
          </LabelInputContainer>

          {/* زر الإرسال */}
          <button
            className="group/btn relative cursor-pointer h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] flex items-center justify-center space-x-2"
            type="submit"
          >
            <IconSend className="h-4 w-4 text-text" />
            <span>Send Message</span>
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-grad-2 to-transparent" />

          <div className="flex flex-col space-y-4">
            <div className="group/btn relative flex overflow-hidden h-10 w-full items-center justify-start space-x-2 rounded-md bg-bg px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]">
              <IconMail className="h-4 w-4 text-text" />
              <Link href={"mail:velante.Solutions@gmail.com"}>
                <span className="text-sm text-text">
                  velante.Solutions@gmail.com
                </span>
              </Link>

              <BorderBeam
                className="from-transparent via-grad-2 to-transparent"
                duration={8}
                size={75}
              />

              <BottomGradient />
            </div>
            <div className="group/btn relative flex overflow-hidden h-10 w-full items-center justify-start space-x-2 rounded-md bg-bg px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]">
              <IconPhone className="h-4 w-4 text-text" />
              <Link href={"tel:+201148620380"}>
                <span className="text-sm text-text">01148620380</span>
              </Link>
              <BorderBeam
                className="from-transparent via-grad-2 to-transparent"
                duration={8}
                size={75}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

/* المكونات المساعدة */

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
