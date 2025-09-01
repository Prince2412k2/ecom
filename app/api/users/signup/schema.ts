import z from "zod";

const UserRequest = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

export default UserRequest;

/*
 
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "password": "supersecret"
  }'
 */
