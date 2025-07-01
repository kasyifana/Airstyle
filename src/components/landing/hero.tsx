'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Section from '@/components/landing/section';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Hero() {
  return (
    <Section className="!pt-32 md:!pt-40 lg:!pt-48 !pb-12">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center text-left lg:items-start">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Find Your Perfect Hairstyle with AI
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/80">
            Stop guessing. Airstyle analyzes your hair and face to give you personalized recommendations for styles, products, and salons. Your next great look is just a tap away.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
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
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="hidden lg:block">
            <Image
                src="https://placehold.co/600x600.png"
                alt="AI Hairstyle model"
                width={600}
                height={600}
                className="rounded-lg shadow-xl"
                data-ai-hint="hairstyle model"
            />
        </div>
      </div>
    </Section>
  );
}
