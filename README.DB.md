# Database specs
> `mongodb + mongoose`

## Userschema
```
id : ObjectId
name : { type: String, required: true },
password : { type: String, required: true },
email : { type: String, unique: true, required: true },
cart: [cartSchema],
addresses:[{type:String}],
type:{type:String,required:true},
isDeleted:{type:Boolean,required:true,default:false}
```

### cartSchema
```
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: () => new Date() },
  purchased: { type: Boolean, default: false },
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
  isDeleted:{type:Boolean,required:true,default:false}
``` 

## category
```
id : ObjectId,
name : { type: String, unique: true, required: true },
isDeleted:{type:Boolean,required:true,default:false},
```
