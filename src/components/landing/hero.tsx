'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Section from '@/components/landing/section';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Hero() {
  return (
    <Section className="!pt-20 md:!pt-28 lg:!pt-32">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Find Your Perfect Hairstyle with AI
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/80">
            Stop guessing. Airstyle analyzes your hair and face to give you personalized recommendations for styles, products, and salons. Your next great look is just a tap away.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Try The Demo</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="relative aspect-square">
           <Lottie 
                path="https://lottie.host/3392425d-8a1d-4456-bb51-b2d21a814ade/P4buuPd8uo.json"
                loop={true}
                className="w-full h-full"
           />
        </div>
      </div>
    </Section>
  );
}
