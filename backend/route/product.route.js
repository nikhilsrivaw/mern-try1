import express from "express"
const router = express.Router();

router.get("/api/products",async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({succes:true, data:products});
    } catch (error) {
        console.log("error in fetching products: ",error.message);
        res.status(500).json({succes:false, message:"Server Error"});
        
    }
})

router.put("/api.products/:id", async(req,res)=>{
    const {id} = req.params;
    const product = req.body ;

if(!mongoose.Types.ObjectId.isValid(id)){
    return   res.status(404).json({succes:false,  message:"Invalid Productr Id "})

}
    try {
       const updatedProduct= await Product.findByIdAndUpdate(id,product,{new:true});
    } catch (error) {
        res.status(500).json({succes:false,  message:"Server error"})
        
    }
})
router.post('/api/products',async(req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({succes:false, message:'Please provide all fields'});

    }
    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({succes:true , data:newProduct});
    } catch (error) {
        console.log("Error in Create product:",error.message);
        res.status(500).json({succes:false , message:"server eroor"});
        
    }
   
});

router.delete("/api/products/:id", async(req,res)=>{
    const {id}= req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({succes:true , message:"deleted"});
    } catch (error) {
        console.log("error in deleting producrs ")

        res.status(404).json({succes:false , message:"Product not found "});
        
    }
})



export default router;