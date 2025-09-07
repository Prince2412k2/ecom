import { getUserById } from "@/lib/users/getUsers";

export async function togglePaid(id: string) {
  const user = await getUserById(id)
  console.log(user)
  if (!user) return null
  user.cart.forEach((item) => {
    item.purchased = true;
  });
  console.log(user)
  user.save()
}

