import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Airstyle Logo" width={192} height={48} className="h-12 w-auto app-logo" />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.instagram.com/airstyle.co" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Airstyle, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
