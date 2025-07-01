import { Bot, Camera, Scissors, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Section from '@/components/landing/section';

const features = [
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'Hair Type Identification',
    description: 'Upload a photo of your hair, and our AI will instantly identify its type and characteristics.',
  },
  {
    icon: <Camera className="w-8 h-8 text-primary" />,
    title: 'Real-time Simulation',
    description: 'Use your camera to try on different hairstyles in real-time and see how they look on you.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: 'AI Hairstyle Recommendations',
    description: 'Get hairstyle suggestions perfectly tailored to your face shape and hair type.',
  },
  {
    icon: <ShoppingBag className="w-8 h-8 text-primary" />,
    title: 'Personalized Products',
    description: 'Discover the best products for your hair, complete with purchase links and ingredient warnings.',
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: 'Expert Salon Finder',
    description: 'Locate top-rated salons in your area that specialize in your unique hair type.',
  },
  {
    icon: <Scissors className="w-8 h-8 text-primary" />,
    title: 'Trendy & Classic Styles',
    description: 'Explore a vast library of hairstyles, from the latest trends to timeless classics.',
  },
];

export default function Features() {
  return (
    <Section id="features" className="bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Everything You Need for Perfect Hair
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Airstyle combines cutting-edge AI with expert knowledge to revolutionize your hair care routine.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-background hover:bg-card/90 transition-all transform hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-bold text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2">{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
