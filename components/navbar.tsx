"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import DropDown from "./ui/dropdown";

const Navbar = ({ session }: { session: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

    
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Lodges", href: "/our-lodges" },
    // { name: "Amenities", href: "/amenities" },
    // { name: "Activities", href: "/activities" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span
              className={cn(
                "text-2xl font-bold transition-colors",
                isScrolled ? "text-emerald-700" : "text-white"
              )}
            >
              Windermere Lodges
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-emerald-500",
                  isScrolled ? "text-gray-700" : "text-white",
                  pathname === link.href &&
                    (isScrolled ? "text-emerald-600" : "text-emerald-300")
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <DropDown user={session?.user} isMobile={false}/>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className={cn(
                    isScrolled
                      ? "text-gray-700 hover:text-emerald-600"
                      : "text-white hover:text-emerald-300"
                  )}
                >
                  Login
                </Button>
              </Link>
            )}
            {/* <Link href="/booking">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Book Now
              </Button>
            </Link> */}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2 rounded-md",
                isScrolled ? "text-gray-700" : "text-white"
              )}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-md font-medium",
                    pathname === link.href
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-2 space-y-3">
                {!session ? (
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                ) : (
                  <DropDown user={session?.user} isMobile={true}/>
                )}
                {/* <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Book Now
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
