
import z from "zod";

const SearchRequest = z.object({
  query: z.string(),
})

export const SearchResponse = z.array(z.object({
  _id: z.string(),
  title: z.string(),
  image: z.string(),
  score: z.number(),
}));

export type SearchResponseType = z.infer<typeof SearchResponse>;
export default SearchRequest;
