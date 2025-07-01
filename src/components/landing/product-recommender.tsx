'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Link as LinkIcon, AlertTriangle, Loader2 } from 'lucide-react';

import { getHairProductRecommendations } from '@/lib/actions';
import type { RecommendProductsOutput } from '@/ai/flows/recommend-products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  hairType: z.string().min(1, 'Please select a hair type.'),
  scalpCondition: z.string().min(1, 'Please select a scalp condition.'),
  preferences: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductRecommender() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = React.useState<RecommendProductsOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { hairType: '', scalpCondition: '', preferences: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);

    const result = await getHairProductRecommendations(data);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    } else {
      setRecommendations(result.data);
    }
    setIsLoading(false);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>AI Product Recommender</CardTitle>
        <CardDescription>
          Tell us about your hair, and our AI will find the perfect products for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="hairType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hair Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select your hair type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="oily">Oily</SelectItem>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                        <SelectItem value="curly">Curly</SelectItem>
                        <SelectItem value="wavy">Wavy</SelectItem>
                        <SelectItem value="straight">Straight</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scalpCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scalp Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select your scalp condition" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dandruff">Dandruff</SelectItem>
                        <SelectItem value="itchy">Itchy</SelectItem>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="oily">Oily</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferences (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., vegan, sulfate-free, for colored hair" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : 'Get Recommendations'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || recommendations) && (
        <CardFooter className="flex-col items-start gap-4">
          {isLoading && (
            <div className='w-full grid md:grid-cols-2 gap-4'>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
          )}
          {recommendations?.recommendedProducts && (
            <>
              <h3 className="text-lg font-semibold">Here's what we found for you:</h3>
              <div className="grid md:grid-cols-2 gap-4 w-full">
                {recommendations.recommendedProducts.map((product) => (
                  <div key={product.name} className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <p className="text-sm my-2">{product.description}</p>
                    {product.potentiallyHarmfulIngredients?.length > 0 && (
                      <div className="text-xs text-amber-500 bg-amber-500/10 p-2 rounded-md my-2">
                        <div className="font-bold flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Heads Up</div>
                        Contains: {product.potentiallyHarmfulIngredients.join(', ')}
                      </div>
                    )}
                    <Button variant="link" asChild className="p-0 h-auto">
                        <a href={product.purchaseLink} target="_blank" rel="noopener noreferrer">
                            Buy Now <LinkIcon className="w-4 h-4 ml-1" />
                        </a>
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
           {recommendations?.recommendedProducts?.length === 0 && (
             <div className="w-full text-center py-8 bg-muted/30 rounded-lg">
                <Bot className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Our AI couldn't find specific products for this combination. Please try different options.</p>
             </div>
           )}
        </CardFooter>
      )}
    </Card>
  );
}
