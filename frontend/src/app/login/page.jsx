'use client';
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
      });

      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('storageChange'));
      if (onLogin) onLogin();
      router.push('/goals');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#193442]">
      <div className="absolute top-0 left-0 w-full h-64 bg-[#193442] rounded-b-[30%] -z-10" />
      <Card className="w-full max-w-md shadow-xl border-0 z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#193442]">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-50 text-red-600 border-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#193442]">
                  Password
                </Label>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs text-[#193442]"
                >
                  Forgot password?
                </Button>
              </div>
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
                'w-full bg-[#193442] hover:bg-[#193442]/90 text-white',
                isLoading && 'opacity-70 cursor-not-allowed',
              )}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-[#F5E8B1] pt-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Button
              variant="link"
              className="p-0 h-auto text-[#193442]"
              onClick={() => router.push('/register')}
            >
              Sign up
            </Button>
          </p>
        </CardFooter>
      </Card>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-[#F5E8B1] rounded-t-[50%] z-10" />
    </div>
  );
}