"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 ">
      <div
        className={`backdrop-blur-md backdrop-saturate-150 mx-auto max-w-7xl transition-all duration-500 [backdrop-filter:blur(12px)_saturate(150%)] ${
          scrolled
            ? "bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_1000px_rgba(124,92,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10"
            : "bg-transparent shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_80px_rgba(124,92,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)]"
        } hover:shadow-[0_12px_480px_rgba(124,92,255,0.5),0_0_120px_rgba(124,92,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-purple/50 hover:scale-[1.01] hover:border-purple-500/20`}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/50 transition-all duration-300 animate-pulse"></div>
              <img
                src="/gravity-logo.ico"
                alt="Gravity Logo"
                className="relative w-11 h-11 object-contain drop-shadow-[0_0_15px_rgba(124,92,255,0.6)] transition-all duration-300 ease-out group-hover:scale-125 group-hover:rotate-6 group-hover:drop-shadow-[0_0_30px_rgba(124,92,255,1)]"
              />
            </div>
            <span className="font-bold text-2xl hidden sm:inline gradient-text bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-500 animate-[shimmer_3s_ease-in-out_infinite]">
              GRAVITY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:scale-110 transition-all duration-300 group"
              >
                <span className="relative z-10 group-hover:animate-pulse">
                  {link.label}
                </span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 group-hover:w-[calc(100%-2.5rem)] transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-purple-500/20 hover:scale-110 hover:rotate-90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-transparent hover:border-purple-500/30"
          >
            {isOpen ? (
              <X size={24} className="rotate-90" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-2 animate-[slideDown_0.3s_ease-out]">
          <div className="backdrop-blur-md backdrop-saturate-150 bg-black/40 border border-purple-500/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_60px_rgba(124,92,255,0.3)] p-4 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${index * 50}ms` }}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:pl-6 hover:scale-105 transition-all duration-300 animate-[slideIn_0.3s_ease-out_both] border border-transparent hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
