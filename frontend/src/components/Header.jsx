"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import logo from "@/images/logo.png"; 
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storageChange", handleStorageChange);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storageChange"));
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-[#193442]/90 text-white p-4 shadow-lg z-20 border-b border-[#F5E8B1]/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="transition-transform hover:scale-105">
          <Image
            src={logo}
            alt="Logo"
            width={130}
            className="ml-2 rounded-full"/>
        </Link>
        <nav>
          {isLoggedIn ? (
            <div className="space-x-4 flex items-center">
              <Link
                href="/goals"
                className="text-[#F5E8B1] hover:text-white transition-colors duration-200 px-3 py-1 rounded-md hover:bg-[#F5E8B1]/10"
              >
                Goals
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-[#F5E8B1] border border-[#F5E8B1]/30 rounded-md 
                          hover:bg-[#F5E8B1] hover:text-[#193442] transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4 flex items-center">
              <Link
                href="/login"
                className="text-[#F5E8B1] hover:text-white transition-colors duration-200 px-3 py-1 rounded-md hover:bg-[#F5E8B1]/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 text-[#193442] bg-[#F5E8B1] rounded-md 
                          hover:bg-[#F5E8B1]/90 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}