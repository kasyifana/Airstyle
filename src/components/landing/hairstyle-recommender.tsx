'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Sparkles, Scissors, User, Upload, Loader2, Bot, Info } from 'lucide-react';

import { getHairstyleRecommendations } from '@/lib/actions';
import type { RecommendHairstylesOutput } from '@/ai/flows/recommend-hairstyles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  photo: z.any().refine((file) => file instanceof File, 'Please upload a photo.'),
  hairType: z.string().min(1, 'Please select a hair type.'),
  faceShape: z.string().min(1, 'Please select a face shape.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function HairstyleRecommender() {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = React.useState<RecommendHairstylesOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { hairType: '', faceShape: '' },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);

    const reader = new FileReader();
    reader.readAsDataURL(data.photo);
    reader.onload = async () => {
      const photoDataUri = reader.result as string;
      const result = await getHairstyleRecommendations({
        photoDataUri,
        hairType: data.hairType,
        faceShape: data.faceShape,
      });

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
    reader.onerror = () => {
        toast({
            variant: "destructive",
            title: "File Error",
            description: "Could not read the uploaded file.",
        });
        setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="text-center">
        <CardTitle>AI Hairstyle Advisor</CardTitle>
        <CardDescription>
          Upload your photo and let our AI suggest the most flattering hairstyles for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Live Camera Feature</AlertTitle>
            <AlertDescription>
            In our app, this works in real-time with your camera for an instant virtual try-on!
            </AlertDescription>
        </Alert>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Your Photo</FormLabel>
                    <FormControl>
                        <div 
                            className="relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            {preview ? (
                                <Image src={preview} alt="Photo preview" layout="fill" objectFit="contain" className="rounded-lg" />
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <Upload className="mx-auto h-8 w-8" />
                                    <p>Click to upload a photo</p>
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="hairType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Hair Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select your hair type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="wavy">Wavy</SelectItem>
                            <SelectItem value="curly">Curly</SelectItem>
                            <SelectItem value="straight">Straight</SelectItem>
                            <SelectItem value="fine">Fine</SelectItem>
                            <SelectItem value="thick">Thick</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="faceShape"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Face Shape</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select your face shape" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="oval">Oval</SelectItem>
                            <SelectItem value="round">Round</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                            <SelectItem value="heart">Heart</SelectItem>
                            <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : 'Get Hairstyle Ideas'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || recommendations) && (
        <CardFooter className="flex-col items-start gap-4">
          {isLoading && <Skeleton className="h-32 w-full" />}
          {recommendations?.recommendedHairstyles && (
             <>
             <h3 className="text-lg font-semibold">Our AI suggests these styles for you:</h3>
             {recommendations.recommendedHairstyles.length > 0 ? (
                <ul className="list-none space-y-2 w-full">
                    {recommendations.recommendedHairstyles.map((style) => (
                        <li key={style} className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                           <div className="bg-primary/10 p-2 rounded-full"><Scissors className="w-4 h-4 text-primary" /></div> 
                           <span className="font-medium">{style}</span>
                        </li>
                    ))}
                </ul>
             ) : (
                <div className="w-full text-center py-8 bg-muted/30 rounded-lg">
                    <Bot className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Our AI is stumped! We couldn't generate specific recommendations. Try another photo or different options.</p>
                </div>
             )}
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
