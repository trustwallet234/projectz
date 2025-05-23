import ProtectedRoute from '@/components/ProtectedRoute';
import CardForm from '@/components/cards/CardForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateCardPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <CardForm />
      </div>
    </ProtectedRoute>
  );
}