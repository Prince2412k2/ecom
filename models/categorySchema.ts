
import { Schema, model, models, Types } from "mongoose";
type CategoryType = {
  name: string;
}

export type CategoryResponseType = CategoryType & { _id: Types.ObjectId };
const CategorySchema = new Schema<CategoryType>({
  name: { type: String, unique: true, required: true }
});

export const Category = models.Category || model<CategoryType>("Category", CategorySchema);

