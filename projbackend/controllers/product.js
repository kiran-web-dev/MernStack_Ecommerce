const formidable = require("formidable");
const Product =require("../models/product");
const fs =require("fs");


exports.getProductById = (req, res, next, id) =>{
    //
    Product.findById(id)
    .populate("category")
    .exec((err, product) =>{
        if(err){
            return res.status(400).json({
                error: "Product not found in DB"
            })
        }
        req.product = product;
        next();
    })
};

exports.createProduct = (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()
      });
    }
    
   const form = new formidable.IncomingForm();
   form.keepExtensions =true;

   form.parse(req, (err, fields, file) =>{
       if(err){
           return res.status(400).json({
               error: "Problem with image"
           })
       }
       //destructure the fields
       const {name,price,description, category,stock} =fields;

       //TODO:Recommended way to adding restrictions is in Routes itself (done)

       /*
       //restriction for fields 
       if(
           !name || !price || !description || !category || !stock
       ){
           return res.status(400).json({
               error: "Please include all fields "
           })
       }
       */
      
       let product = new Product(fields)

       //Handle file here
       if(file.photo){
           if(file.photo.size > 3000000){
               return res.status(400).json({
                   error: "file size too BIG!!!!"
               })
           }
           product.photo.data =fs.readFileSync(file.photo.path)
           product.photo.contentType =file.photo.type
       }
       
       //save to DB
       product.save((err, product) =>{
           if(err){
               //return
               res.status(400).json({
                   error: "saving product in database Failed"
               })
           }
           res.json(product);
       })

   });

};