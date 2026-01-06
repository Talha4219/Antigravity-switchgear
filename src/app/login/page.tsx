'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/layout/logo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // We removed the automatic redirect to /admin to allow showing the logout button if requested
  }, [status, router]);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: '/' });
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push('/admin');
    } catch (error: any) {
      console.error('Sign In Error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign In Error',
        description: error.message || 'Invalid credentials',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Already Logged In</CardTitle>
              <CardDescription>You are currently signed in as {session?.user?.email}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button variant="outline" asChild className="w-full">
                  <a href="/admin">Go to Dashboard</a>
                </Button>
                <Button onClick={handleLogout} className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Authorized personnel only. Sessions expire after 15 minutes of inactivity.
        </p>
      </div>
    </div>
  );
}
