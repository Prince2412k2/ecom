import User, { DbUserType } from "@/models/userSchema"
import { comparePassword } from "@/lib/password";
import { ObjectId } from "mongoose";

export async function validateUser({ password, email }: { email: string, password: string }): Promise<boolean | DbUserType & { _id: ObjectId }> {
  const user = await User.findOne({ email })
  if (!user) return false
  const isValid = await comparePassword(password, user.password);
  if (!isValid) return false
  return user
}
