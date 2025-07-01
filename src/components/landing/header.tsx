'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Demo', href: '#demo' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" alt="Airstyle Logo" width={24} height={24} className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Airstyle</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile nav */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setOpen(false)}>
                  <Image src="/logo.png" alt="Airstyle Logo" width={24} height={24} className="h-6 w-6" />
                  <span className="font-bold">Airstyle</span>
                </Link>
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-foreground/80">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Image src="/logo.png" alt="Airstyle Logo" width={24} height={24} className="h-6 w-6" />
              <span className="font-bold">Airstyle</span>
            </Link>
          </div>
          <nav className="hidden md:flex">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Get Started</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Get The Airstyle App</DialogTitle>
                  <DialogDescription>
                    Download our app from the App Store or Google Play to get started with your hair transformation journey.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <a href="#" className="w-48">
                    <Image
                      src="https://placehold.co/180x60.png"
                      alt="Download on the App Store"
                      width={180}
                      height={60}
                      data-ai-hint="app store badge"
                      className="w-full h-auto"
                    />
                  </a>
                  <a href="#" className="w-48">
                    <Image
                      src="https://placehold.co/180x60.png"
                      alt="Get it on Google Play"
                      width={180}
                      height={60}
                      data-ai-hint="google play badge"
                      className="w-full h-auto"
                    />
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </div>
    </header>
  );
}
