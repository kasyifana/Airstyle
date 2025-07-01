// src/ai/flows/recommend-salons.ts
'use server';

/**
 * @fileOverview Recommends local hair salons that specialize in the user's hair type.
 *
 * - recommendSalons - A function that recommends salons.
 * - RecommendSalonsInput - The input type for the recommendSalons function.
 * - RecommendSalonsOutput - The return type for the recommendSalons function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSalonsInputSchema = z.object({
  hairType: z.string().describe('The user\'s hair type.'),
  location: z.string().describe('The user\'s current location.'),
});
export type RecommendSalonsInput = z.infer<typeof RecommendSalonsInputSchema>;

const SalonSchema = z.object({
  name: z.string().describe('The name of the salon.'),
  address: z.string().describe('The address of the salon.'),
  phoneNumber: z.string().describe('The phone number of the salon.'),
  specialties: z.array(z.string()).describe('The specialties of the salon.'),
});

const RecommendSalonsOutputSchema = z.object({
  salons: z.array(SalonSchema).describe('A list of recommended salons.'),
});
export type RecommendSalonsOutput = z.infer<typeof RecommendSalonsOutputSchema>;

export async function recommendSalons(input: RecommendSalonsInput): Promise<RecommendSalonsOutput> {
  return recommendSalonsFlow(input);
}

const getSalons = ai.defineTool(
  {
    name: 'getSalons',
    description: 'Retrieves a list of salons specializing in a specific hair type, given a location.',
    inputSchema: z.object({
      hairType: z.string().describe('The hair type to search for.'),
      location: z.string().describe('The location to search in.'),
    }),
    outputSchema: z.array(SalonSchema),
  },
  async (input) => {
    // TODO: Implement the actual salon retrieval logic here.
    // This is a placeholder that returns an empty array.
    return [];
  }
);

const prompt = ai.definePrompt({
  name: 'recommendSalonsPrompt',
  tools: [getSalons],
  input: {schema: RecommendSalonsInputSchema},
  output: {schema: RecommendSalonsOutputSchema},
  prompt: `You are a salon recommendation expert. The user will provide their hair type and location. Use the getSalons tool to find salons that specialize in the user's hair type and are located near the user.

Hair Type: {{{hairType}}}
Location: {{{location}}}
`,
});

const recommendSalonsFlow = ai.defineFlow(
  {
    name: 'recommendSalonsFlow',
    inputSchema: RecommendSalonsInputSchema,
    outputSchema: RecommendSalonsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
