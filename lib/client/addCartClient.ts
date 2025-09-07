import axios, { AxiosError } from "axios";

export async function addToCart(id: string, quantity: number) {
  try {

    const res = await axios.post(
      "/api/users/cart",
      { id, quantity },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data; // { msg: "success", cart }
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        console.error("Error:", err.response.data);
        throw err.response.data;
      }
    } else {
      console.error("Unexpected error:", err);
      throw err;
    }
  }
}
