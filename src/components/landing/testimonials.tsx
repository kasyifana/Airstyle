import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Section from '@/components/landing/section';

const testimonials = [
  {
    quote: "I've never been so confident with my hair! Airstyle found me the perfect cut and products. It's a game-changer.",
    name: 'Jessica L.',
    title: 'Fashion Blogger',
    avatar: 'https://picsum.photos/id/1005/100',
    aiHint: 'woman portrait',
  },
  {
    quote: 'The real-time try-on feature is amazing. I tried dozens of styles in minutes without any commitment. Highly recommend!',
    name: 'Mike R.',
    title: 'Software Developer',
    avatar: 'https://picsum.photos/id/1025/100',
    aiHint: 'man portrait',
  },
  {
    quote: "Finding a salon that actually understands my curly hair used to be impossible. Airstyle connected me with a local gem. Thank you!",
    name: 'Chloe T.',
    title: 'Graphic Designer',
    avatar: 'https://picsum.photos/id/1011/100',
    aiHint: 'woman smiling',
  },
  {
    quote: "As someone who knows nothing about hair care, this app is my new best friend. The product recommendations are spot on.",
    name: 'David K.',
    title: 'Marketing Manager',
    avatar: 'https://picsum.photos/id/1027/100',
    aiHint: 'man professional',
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials" className="bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Loved by Users Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Don&apos;t just take our word for it. Here&apos;s what our users have to say about Airstyle.
          </p>
        </div>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center text-center justify-center p-6 gap-4">
                      <Image
                        src={testimonial.avatar}
                        data-ai-hint={testimonial.aiHint}
                        alt={`Avatar of ${testimonial.name}`}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <p className="text-foreground/80 italic">&quot;{testimonial.quote}&quot;</p>
                      <div className="mt-auto">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Section>
  );
}
