"use client";
import React from "react";
import {
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-text md:flex-row">
        <p className="text-center md:text-left">
          © 2025 <span className="font-semibold text-light">[Velante]</span>.
          All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <span className="text-text">Follow us on:</span>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="LinkedIn"
              className="transition-colors hover:text-blue-600"
            >
              <IconBrandLinkedin size={20} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="transition-colors hover:text-blue-500"
            >
              <IconBrandFacebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="transition-colors hover:text-pink-500"
            >
              <IconBrandInstagram size={20} />
            </a>
            <a
              href="#"
              aria-label="X"
              className="transition-colors hover:text-neutral-800"
            >
              <IconBrandX size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
