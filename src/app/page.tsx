"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, getCurrentUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(true); // Add loading state

  // <--- Redirect if already logged in --->
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      router.push("/dashboard");
    } else {
      setIsChecking(false); // Done checking, show form
    }
  }, []);

  // <--- Show nothing while checking auth --->
  if (isChecking) {
    return null;
  }

  // <--- Handle login --->
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    const result = login(username, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Image
        src="/logo.svg"
        alt="Study Buddy Logo"
        width={150}
        height={150}
        priority
      />

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {/* Username input */}
        <form
          onSubmit={handleLogin}
          aria-label="Login form"
          className="flex flex-col gap-2 "
        >
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-required="true"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bc40] text-[#18181b]"
          />

          {/* Password input */}
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bc40] text-[#18181b]"
          />

          {/* Login button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#f5bc40] text-[#18181b] font-semibold rounded-lg hover:bg-[#e5ac30] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus:outline-none transition-colors cursor-pointer"
          >
            Login
          </button>
          {message && (
            <p aria-live="polite" className="text-red-600">
              {message}
            </p>
          )}
        </form>

        {/* Signup link */}
        <Link
          href="/signup"
          className="w-full px-4 py-3 bg-white text-gray-600 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors cursor-pointer text-center block"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
