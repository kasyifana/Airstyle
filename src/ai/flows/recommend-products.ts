'use server';

/**
 * @fileOverview AI flow that recommends hair care products based on hair type and warns of harmful ingredients.
 *
 * - recommendProducts - A function that handles the product recommendation process.
 * - RecommendProductsInput - The input type for the recommendProducts function.
 * - RecommendProductsOutput - The return type for the recommendProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendProductsInputSchema = z.object({
  hairType: z
    .string()
    .describe("The user's hair type, e.g., oily, dry, normal, mixed"),
  scalpCondition: z.string().describe("The user's scalp condition, e.g., dandruff, itchy, healthy"),
  preferences: z
    .string()
    .optional()
    .describe('Optional preferences, such as cruelty-free, vegan, fragrance-free etc.'),
});
export type RecommendProductsInput = z.infer<typeof RecommendProductsInputSchema>;

const RecommendProductsOutputSchema = z.object({
  recommendedProducts: z.array(
    z.object({
      name: z.string().describe('The name of the product.'),
      brand: z.string().describe('The brand of the product.'),
      description: z.string().describe('A short description of the product.'),
      purchaseLink: z.string().url().describe('A link to purchase the product.'),
      potentiallyHarmfulIngredients: z
        .array(z.string())
        .describe('A list of potentially harmful ingredients in the product.'),
    })
  ).
  describe('A list of products recommended for the user, based on their hair type and scalp condition.'),
});
export type RecommendProductsOutput = z.infer<typeof RecommendProductsOutputSchema>;

export async function recommendProducts(input: RecommendProductsInput): Promise<RecommendProductsOutput> {
  return recommendProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProductsPrompt',
  input: {schema: RecommendProductsInputSchema},
  output: {schema: RecommendProductsOutputSchema},
  prompt: `You are a hair care expert. Recommend hair care products based on the user's hair type, scalp condition, and preferences. Also, warn the user of any potentially harmful ingredients in the products.

  Hair Type: {{{hairType}}}
  Scalp Condition: {{{scalpCondition}}}
  Preferences: {{{preferences}}}

  Return a JSON array of products with name, brand, description, purchaseLink, and potentiallyHarmfulIngredients fields.
  The purchase link should be from a reputable website that sells the mentioned products.
`,
});

const recommendProductsFlow = ai.defineFlow(
  {
    name: 'recommendProductsFlow',
    inputSchema: RecommendProductsInputSchema,
    outputSchema: RecommendProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
