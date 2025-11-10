"use client";

import React from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Home", href: "#Home" },
    { label: "Features", href: "#Features" },
    { label: "Services", href: "#Services" },
    { label: "Testmonials", href: "#Testmonials" },
    { label: "Pricing", href: "#Pricing" },
    { label: "Contact", href: "#Contact" },
  ];

  const menuItems = [
    { label: "Profile", href: "#Home" },
    { label: "Features", href: "#Features" },
    { label: "Services", href: "#Services" },
    { label: "Testmonials", href: "#Testmonials" },
    { label: "Pricing", href: "#Pricing" },
    { label: "Contact", href: "#Contact" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-bg/20 z-[9999] border-b border-zinc-800 "
    >
      {/* Left side */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-light order-5 cursor-pointer"
        />
        <NavbarBrand>
          <Link href="#Home">
            <p className="font-bold bg-gradient-to-r select-none md:pb-1.5 from-grad-4 to-grad-2 bg-clip-text text-transparent text-2xl">
              GROVIA
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center links */}
      <NavbarContent
        className="hidden sm:flex gap-4 lg:gap-12"
        justify="center"
      >
        {navLinks.map(({ label, href }) => (
          <NavbarItem key={label}>
            <Link
              href={href}
              size="md"
              className="relative group text-light hover:text-text font-bold pb-1.5"
            >
              <span className=" absolute w-0 group-hover:w-full bottom-0 h-1 transition-width bg-gradient-to-r from-grad-4 to-grad-2"></span>
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-bg/20 gap-8 z-[9998] border-b border-muted-text/20">
        {menuItems.map(({ label, href }) => (
          <NavbarMenuItem key={label} className="">
            <Link
              className="w-full text-light hover:text-text font-bold  border-b border-muted-text/20 pb-4 pl-4"
              href={href}
              size="md"
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <ScrollProgress />
    </Navbar>
  );
}
