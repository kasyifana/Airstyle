'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, MapPin, Phone, Loader2, Sparkles } from 'lucide-react';

import { getSalonRecommendations } from '@/lib/actions';
import type { RecommendSalonsOutput } from '@/ai/flows/recommend-salons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  hairType: z.string().min(2, 'Please enter a hair type.'),
  location: z.string().min(2, 'Please enter your location.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SalonRecommender() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = React.useState<RecommendSalonsOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { hairType: '', location: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);

    const result = await getSalonRecommendations(data);

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
        <CardTitle>AI Salon Finder</CardTitle>
        <CardDescription>
          Find expert salons near you that specialize in your hair type.
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
                    <FormLabel>Your Hair Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., curly, fine, color-treated" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding Salons</> : 'Find Salons'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || recommendations) && (
        <CardFooter>
          {isLoading && <Skeleton className="h-24 w-full" />}
          {recommendations?.salons && (
            <div className="w-full">
              {recommendations.salons.length > 0 ? (
                <>
                  <h3 className="text-lg font-semibold mb-4">Recommended Salons:</h3>
                  <div className="grid gap-4 w-full">
                    {recommendations.salons.map((salon) => (
                      <div key={salon.name} className="p-4 border rounded-lg bg-muted/30">
                        <h4 className="font-bold">{salon.name}</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1"><MapPin className="w-4 h-4" /> {salon.address}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1"><Phone className="w-4 h-4" /> {salon.phoneNumber}</div>
                        <div className="text-sm flex items-start gap-2 mt-2">
                          <Sparkles className="w-4 h-4 mt-0.5 text-primary" /> 
                          <div><span className="font-medium">Specializes in:</span> {salon.specialties.join(', ')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full text-center py-8 bg-muted/30 rounded-lg">
                  <Bot className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                    Our salon network is growing! We couldn't find a specialized salon for '{form.getValues('hairType')}' in '{form.getValues('location')}' right now. Please check back soon!
                  </p>
                </div>
              )}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
