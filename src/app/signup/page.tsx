"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
  });
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
          <h1 className="text-2xl font-semibold mb-2">Create an Account</h1>
          <p className="text-gray-500 mb-8">Sign up to get started</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">First Name</label>
                <Input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Last Name</label>
                <Input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Date of Birth</label>
                <Input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Phone Number</label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  required
                />
              </div>
            </div>

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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Image
                src={"/googleImg.png"}
                alt="Googleicon"
                height={20}
                width={20}
                priority
                quality={100}
              />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <GithubIcon size={20} />
              Continue with GitHub
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="w-1/2 relative bg-gray-200">
          <Image
            height={100}
            width={100}
            src="/signupImg.avif"
            alt="Team collaboration"
            className="w-full h-full object-cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
