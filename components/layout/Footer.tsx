"use client";

import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold">SecureVault</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {currentYear} SecureVault. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Your data is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}