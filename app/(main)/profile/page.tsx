import { verifyToken } from "@/lib/jwt";
import { getUserWithId } from "@/lib/users/getUsers";
import { CartResponseType } from "@/models/cartSchema";
import { UserResponseType } from "@/models/userSchema";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

function filterCart(
  user: UserResponseType | null
): Array<CartResponseType> | null {
  if (!user) return null;
  return user.cart.filter((item) => item.purchased);
}

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return redirect("/login");
  }
  const id = verifyToken(token);
  const user = await getUserWithId(id);
  const orders = filterCart(user) ?? [];

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">User not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-6">
            <Image
              src="/placeholder.webp"
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-200"
            />
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                {user.name}
              </h1>
              <p className="text-lg text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Addresses
              </h2>
              <div className="space-y-4">
                {user.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <p className="text-gray-700">{address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                My Orders
              </h2>
              {orders.length > 0 ? (
                <ul className="space-y-6">
                  {orders.map((order) => (
                    <li
                      key={String(order.product._id)}
                      className="border border-gray-200 p-4 rounded-lg flex items-center space-x-4 hover:shadow-lg transition"
                    >
                      <Image
                        src={order.product.image ?? "/placeholder.webp"}
                        alt={order.product.title}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {order.product.title}
                        </h3>
                        <p className="text-gray-500">
                          Quantity: {order.quantity}
                        </p>
                        <p className="text-sm text-gray-400">
                          {order.addedAt.toDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">
                          $
                          {(order.product.price * order.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">
                    You have no purchased orders.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
