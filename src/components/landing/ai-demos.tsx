import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Section from '@/components/landing/section';
import ProductRecommender from './product-recommender';
import SalonRecommender from './salon-recommender';
import HairstyleRecommender from './hairstyle-recommender';

export default function AIDemos() {
  return (
    <Section id="demo">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Experience the Magic of AI
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Try our AI tools right here. Get instant, personalized recommendations.
          </p>
        </div>
        <Tabs defaultValue="products" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="salons">Salons</TabsTrigger>
            <TabsTrigger value="hairstyles">Hairstyles</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductRecommender />
          </TabsContent>
          <TabsContent value="salons">
            <SalonRecommender />
          </TabsContent>
          <TabsContent value="hairstyles">
            <HairstyleRecommender />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}
