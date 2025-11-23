"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup, getCurrentUser } from "@/lib/auth";

export default function SignupPage() {
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
      setIsChecking(false);
    }
  }, []);

  // <--- Show nothing while checking auth --->
  if (isChecking) {
    return null;
  }

  // <--- Handle signup --->
  const handleSignup = () => {
    const result = signup(username, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Sign Up</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {/* Username input */}
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

        {/* Sign Up button */}
        <button
          onClick={handleSignup}
          className="w-full px-4 py-3 bg-[#f5bc40] text-white font-semibold rounded-lg hover:bg-[#e5ac30] focus:outline-none transition-colors cursor-pointer"
        >
          Sign Up
        </button>
        {/* Message display */}
        {message && (
          <p aria-live="polite" className="text-red-600">
            {message}
          </p>
        )}

        {/* Login link */}
        <Link
          href="/"
          className="text-center text-gray-600 hover:text-gray-800"
        >
          Already have an account?{" "}
          <span className="text-[#f5bc40] font-semibold">Login</span>
        </Link>
      </div>
    </main>
  );
}
