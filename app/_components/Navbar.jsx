"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Resume Builder", href: "/builder" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (!pathname) return false;
    // exact match OR startsWith for nested routes like /builder/step-1
    return href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-4 md:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[120px] h-7">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-6 font-medium text-sm">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-1 py-1 transition-colors ${
                      active
                        ? "text-gray-900 font-semibold"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* small centered gradient underline for active item */}
                  <span
                    className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-300 ${
                      active
                        ? "w-8 bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400"
                        : "w-0"
                    }`}
                    aria-hidden
                  />
                </li>
              );
            })}
          </ul>

          {/* Right actions (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm hover:underline">
              Sign in
            </Link>
            <Link href="/signup">
              <button className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-95 transition-all">
                Get started
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <span
              className={`absolute w-6 h-[2px] bg-current transform transition-all duration-300 ${
                mobileOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute w-6 h-[2px] bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute w-6 h-[2px] bg-current transform transition-all duration-300 ${
                mobileOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile sliding menu (from right) */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed top-0 right-0 h-full w-[90%] max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[110px] h-6">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
          <button
            aria-label="close menu"
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-5 py-6 bg-white h-full overflow-auto">
          <nav className="flex flex-col justify-between h-full">
            <ul className="flex flex-col gap-6 text-base">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-1 py-1 transition-colors ${
                        active
                          ? "text-gray-900 font-semibold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <div className="relative inline-block">
                        {item.label}
                        {/* little underline for mobile active */}
                        <span
                          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-300 ${
                            active
                              ? "w-10 bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400"
                              : "w-0"
                          }`}
                          aria-hidden
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <Link href="/login">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-full border border-gray-200"
                >
                  Sign in
                </button>
              </Link>
              <Link href="/signup">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full px-4 py-2 rounded-full text-white bg-indigo-600"
                >
                  Get started
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Backdrop when mobile menu open */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />
    </>
  );
}
