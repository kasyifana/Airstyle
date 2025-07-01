'use server';

import {
  recommendProducts,
  type RecommendProductsInput,
} from '@/ai/flows/recommend-products';
import {
  recommendSalons,
  type RecommendSalonsInput,
} from '@/ai/flows/recommend-salons';
import {
  recommendHairstyles,
  type RecommendHairstylesInput,
} from '@/ai/flows/recommend-hairstyles';

export async function getHairProductRecommendations(
  input: RecommendProductsInput
) {
  try {
    const result = await recommendProducts(input);
    return { data: result };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get product recommendations.' };
  }
}

export async function getSalonRecommendations(input: RecommendSalonsInput) {
  try {
    // The underlying tool is a placeholder, so this will return an empty array.
    // In a real app, this would fetch from a database or external API.
    const result = await recommendSalons(input);
    return { data: result };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get salon recommendations.' };
  }
}

export async function getHairstyleRecommendations(
  input: RecommendHairstylesInput
) {
  if (!input.photoDataUri.startsWith('data:image/')) {
    return { error: 'Invalid image format. Please upload a valid image file.' };
  }
  try {
    const result = await recommendHairstyles(input);
    return { data: result };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get hairstyle recommendations.' };
  }
}
