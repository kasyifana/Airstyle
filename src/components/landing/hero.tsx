'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Section from '@/components/landing/section';

export default function Hero() {
  return (
    <Section className="!pt-32 md:!pt-40 lg:!pt-48 !pb-12">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left lg:items-start">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Find Your Perfect Hairstyle with AI
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/80">
            <strong>Stop guessing.</strong> Airstyle analyzes your hair and face to give you personalized recommendations for styles, products, and salons. Your next great look is just a tap away.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link href="#demo">Try Demo</Link>
            </Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="hidden lg:block">
            <Image
                src="/Model.png"
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
