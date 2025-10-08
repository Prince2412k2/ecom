import { getUserById } from "@/lib/users/getUsers";
import { Product } from "@/models/productSchema";

export async function togglePaid(id: string) {
  const user = await getUserById(id);
  if (!user) return null;

  for (const item of user.cart) {
    if (!item.purchased) {
      item.purchased = true;

      // Find the product and update its stock
      const product = await Product.findById(item.product);
      if (product) {
        product.quantity -= item.quantity;
        product.sold += item.quantity;
        await product.save();
      }
    }
  }

  await user.save();
}