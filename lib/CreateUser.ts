import { Document } from "mongoose";
import User, { type UserType, type DbUserType } from "@/models/userSchema"

export default async function createUser(user: UserType): Promise<DbUserType & Document> {
  try {
    const newUser = await User.create(user);
    console.log("User Created", newUser);
    return newUser
  }
  catch (err) {
    console.error("error creating user", err);
    throw err
  }
}
