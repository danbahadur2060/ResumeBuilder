"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import React, { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import {LogOutIcon } from "lucide-react";


export default  function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username , setUsername] = useState('......');
  


  const fetchUser  = async () =>{
    const user = await authClient.getSession();
    setUsername(user.data.user.name);
  }
  const logoutHandler = async() =>{
    await authClient.signOut();
    redirect('/');
  }

  useEffect(()=>{
fetchUser()
  },[])
  
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="max-w-[1450px] mx-auto flex items-center justify-between h-16 px-4 md:px-8 lg:px-12">
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

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm font-medium">
              Welcome!,{" "}
              <span className="font-semibold text-blue-700"> {username}</span>
            </span>

            <button onClick={logoutHandler} className="text-sm cursor-pointer border flex border-gray-200 rounded-full px-6 py-2 decoration-none font-bold  gap-3 outline-none">
              Log Out <LogOutIcon className="text-gray-400" />
            </button>
          </div>

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
        <div className="flex items-center h-[20%] p-7 gap-4">
          <span className="text-sm font-medium">
            Welcome!,{" "}
            <span className="font-semibold text-blue-700"> {username}</span>
          </span>

          <button onClick={logoutHandler} className="text-sm cursor-pointer border flex border-gray-200 rounded-full px-6 py-2 decoration-none font-bold  gap-3 outline-none">
            Log Out <LogOutIcon />
          </button>
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
