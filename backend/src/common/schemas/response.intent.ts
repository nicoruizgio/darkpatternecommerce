import { z } from 'zod';

const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().url(),
});

const actionSchema = z.enum(['addToCart', 'recommend']).default('recommend');

export const StructuredShoppingResponse = z.object({
  reply: z.string(),
  action: actionSchema,
  products: z.array(ProductSchema).optional(),
});

export type ShoppingIntent = z.infer<typeof StructuredShoppingResponse>;
