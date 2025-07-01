// RecommendHairstyles story implementation.

'use server';

/**
 * @fileOverview AI flow for recommending hairstyles based on user's camera input.
 *
 * - recommendHairstyles - A function that handles the hairstyle recommendation process.
 * - RecommendHairstylesInput - The input type for the recommendHairstyles function.
 * - RecommendHairstylesOutput - The return type for the recommendHairstyles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendHairstylesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face and hair, captured via camera, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  hairType: z.string().describe('The identified hair type of the user.'),
  faceShape: z.string().describe('The face shape of the user.'),
});
export type RecommendHairstylesInput = z.infer<typeof RecommendHairstylesInputSchema>;

const RecommendHairstylesOutputSchema = z.object({
  recommendedHairstyles: z
    .array(z.string())
    .describe('A list of hairstyles that are recommended for the user.'),
});
export type RecommendHairstylesOutput = z.infer<typeof RecommendHairstylesOutputSchema>;

export async function recommendHairstyles(input: RecommendHairstylesInput): Promise<RecommendHairstylesOutput> {
  return recommendHairstylesFlow(input);
}

const recommendHairstylesPrompt = ai.definePrompt({
  name: 'recommendHairstylesPrompt',
  input: {schema: RecommendHairstylesInputSchema},
  output: {schema: RecommendHairstylesOutputSchema},
  prompt: `You are a professional hairstylist with expertise in recommending hairstyles based on hair type and face shape.

  Given the user's hair type: {{{hairType}}}, and face shape: {{{faceShape}}}.

  Recommend a list of hairstyles that would be suitable for them.

  Consider the latest trends and classic styles.

  Here is a photo of the user:
  {{media url=photoDataUri}}
  `,
});

const recommendHairstylesFlow = ai.defineFlow(
  {
    name: 'recommendHairstylesFlow',
    inputSchema: RecommendHairstylesInputSchema,
    outputSchema: RecommendHairstylesOutputSchema,
  },
  async input => {
    const {output} = await recommendHairstylesPrompt(input);
    return output!;
  }
);
