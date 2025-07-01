import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { AirstyleLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <AirstyleLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Airstyle</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
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
