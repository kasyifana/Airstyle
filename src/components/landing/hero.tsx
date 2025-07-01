'use client';

import { Button } from '@/components/ui/button';
import Section from '@/components/landing/section';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://lottie.host/6477b3ba-fe33-427c-9e14-82ada545266f/JTz1vPHFkg.lottie')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((error) => {
        console.error("Failed to fetch Lottie animation:", error);
      });
  }, []);

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
          {animationData ? (
             <Lottie animationData={animationData} className="w-full h-full" />
          ): <div className="w-full h-full bg-muted rounded-lg" />}
        </div>
      </div>
    </Section>
  );
}
