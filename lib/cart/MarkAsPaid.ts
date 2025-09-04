import { getUserWithId } from "./getCart";

export async function togglePaid(id: string) {
  const user = await getUserWithId(id)
  console.log(user)
  if (!user) return null
  user.cart.forEach((item) => {
    item.purchased = true;
  });
  console.log(user)
  user.save()
}

