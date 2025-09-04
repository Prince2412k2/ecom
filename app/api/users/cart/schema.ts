

import z from "zod";

const AddCartRequest = z.object({
  id: z.string(),
  quantity: z.number(),
})


export default AddCartRequest;
