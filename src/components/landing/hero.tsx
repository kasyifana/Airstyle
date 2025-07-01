import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Section from '@/components/landing/section';

export default function Hero() {
  return (
    <Section className="!pt-20 md:!pt-28 lg:!pt-32">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center text-center">
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
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
          <Image
            src="https://placehold.co/800x800.png"
            alt="Woman with stylish hair"
            data-ai-hint="woman stylish hair"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </Section>
  );
}
