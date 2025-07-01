import { z } from 'zod';

export const StructuredShoppingResponse = z.object({
  reply: z.string(),
  action: z.string().optional(),
  products: z.string().optional(),
});

export type ShoppingIntent = z.infer<typeof StructuredShoppingResponse>;
