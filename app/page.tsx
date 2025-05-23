import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Key, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm mb-6">
                Secure by Design
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Your Personal Information, <span className="text-primary">Encrypted</span> and Secure
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SecureVault uses client-side AES-256 encryption to ensure your sensitive information is never stored in plaintext. Only you can decrypt and access your data.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="group">
                  <Link href="/signup">
                    Get Started
                    <Shield className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-3xl opacity-20 animate-pulse" />
              <div className="relative bg-card border rounded-xl shadow-xl overflow-hidden">
                <div className="px-4 py-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg bg-background">
                        <div className="flex items-center justify-between">
                          <div className="w-40 h-4 bg-secondary rounded" />
                          <Lock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="w-full h-3 bg-secondary rounded" />
                          <div className="w-2/3 h-3 bg-secondary rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 md:gap-10 items-center">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter">
                How It Works
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
                Your data is encrypted before it leaves your device and can only be decrypted by you
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Client-Side Encryption</h3>
                <p className="text-muted-foreground">
                  Your sensitive data is encrypted using AES-256 before it leaves your browser
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Only encrypted data is stored in the cloud, ensuring your information remains private
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Your Keys, Your Control</h3>
                <p className="text-muted-foreground">
                  Encryption keys never leave your device, giving you complete control over your data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Secure Your Information?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up now and start storing your personal information securely.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}