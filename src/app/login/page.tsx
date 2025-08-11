"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden shadow-lg bg-white">
        <div className="w-1/2 bg-gradient-to-b from-gray-50 to-yellow-50 p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mb-2">Welcome Back</h1>
          <p className="text-gray-500 mb-8">Sign in to continue</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Password</label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-yellow-500 font-medium">
              Create one
            </Link>
          </p>
        </div>

        <div className="w-1/2 relative bg-gray-200">
          <Image
            height={100}
            width={100}
            src="/loginImage.avif"
            alt="Team meeting"
            className="w-full h-full object-cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
