import { AuthForm } from '@/components/auth/AuthForm';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">Sign in to access your secure information</p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg shadow-sm p-6 md:p-8">
          <AuthForm mode="login" />
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}