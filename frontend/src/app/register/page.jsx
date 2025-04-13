"use client";
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const data = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }).then((res) => {
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
      });
  
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storageChange")); // Add this
      router.push("/goals");
    } catch (err) {
      setError("Registration failed. User may already exist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#193442]">
      <div className="absolute top-0 left-0 w-full h-64 rounded-b-[30%] bg-[#193442] -z-10" />

      <Card className="w-full max-w-md shadow-xl border-1 z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#193442]">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="mb-4 flex flex-col justify-center bg-red-50 text-red-600 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="mt-1" >{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#193442]">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-[#193442]/20 focus-visible:ring-[#193442]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#193442]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#193442]/20 focus-visible:ring-[#193442]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#193442]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#193442]/20 focus-visible:ring-[#193442]"
              />
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full bg-[#193442] hover:bg-[#193442]/90 text-white",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-[#F5E8B1] pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-[#193442]"
              onClick={() => router.push("/login")}
            >
              Sign in
            </Button>
          </p>
        </CardFooter>
      </Card>

      <div className="absolute bottom-0 right-0 w-full h-32 bg-[#F5E8B1] rounded-t-[50%] z-1" />
    </div>
  );
}