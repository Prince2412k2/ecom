import { z } from "zod";


const CartResponse = z.array(
  z.object({
    product: z.object({
      _id: z.string(),
      title: z.string(),
      image: z.string(),
      price: z.number(),
      brand: z.string(),
      category: z.string(),
      quantity: z.number(),

      model: z.string().optional(),
      color: z.string().optional(),
      onSale: z.boolean().optional(),
      discount: z.number().optional(),
    }),
    quantity: z.number(),
    addedAt: z.date(),
    purchased: z.boolean(),
  })
);


export type CartClientResponseType = z.infer<typeof CartResponse>;
export type CartClientItemType = z.infer<typeof CartResponse>[number];

export default CartResponse;
