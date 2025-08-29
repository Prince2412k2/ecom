# Database specs
> `mongodb + mongoose`

## Userschema

```
id : ObjectId
name : { type: String, required: true },
password : { type: String, required: true },
email : { type: String, unique: true, required: true }
``` 

## ProductSchema

```
  id : ObjectId
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },

  // optional fields
  model: { type: String, default: "" },
  color: { type: String, default: "" },
  onSale: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
``` 

## category

```
id : ObjectId
name : { type: String, unique: true, required: true }
```
