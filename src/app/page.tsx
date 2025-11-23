"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // <--- Handle login --->
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    const result = login(username, password);

    if (result.success) {
      router.push("/todo");
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#f5bc40]"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#f5bc40]"
          />

          {/* Login button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#f5bc40] text-white font-semibold rounded-lg hover:bg-[#e5ac30] focus:outline-none transition-colors cursor-pointer"
          >
            Login
          </button>
          {message && (
            <p aria-live="polite" className="text-red-600">
              {message}
            </p>
          )}
        </form>

        {/* Signup button */}
        <Link href="/signup">
          <button className="w-full px-4 py-3 bg-white text-gray-600 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none transition-colors cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
