const formidable = require("formidable");
const Product =require("../models/product");
const _= require("lodash");
const fs =require("fs");
const { sortBy } = require("lodash");
const product = require("../models/product");
//const { check, validationResult } = require("express-validator");



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
    /*
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()
      });
    }
    */
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

       //TODO:Recommended way to adding restrictions is in Routes itself 

       //restriction for fields 
       if(
           !name || !price || !description || !category || !stock
       ){
           return res.status(400).json({
               error: "Please include all fields "
           })
       }
      
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
       //console.log(product);
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

exports.getProduct = (req, res) =>{
    req.product.photo = undefined;
    return res.json(req.product)
};

//Middleware for load photo optimization
exports.photo = (req, res, next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
};

//Delete controllers
exports.deleteProduct = (req, res) =>{
    let product =req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }
        res.json({
            message: "Deletion was success",
            deleteProduct
        })
    })
};

//update contollers
exports.updateProduct = (req, res) =>{
    const form = new formidable.IncomingForm();
    form.keepExtensions =true;
 
    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
       //Updation code
        let product = req.product;
        product = _.extend(product, fields)
 
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
        //console.log(product);
        //save to DB
        product.save((err, product) =>{
            if(err){
                //return
                res.status(400).json({
                    error: "Updation of product Failed"
                })
            }
            res.json(product);
        })
 
    });
};

//Listing 
exports.getAllProducts = (req, res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) =>{
        if(err){
            return res.status(400).json({
                error: "No Product Found"
            })
        }
        res.json(products)
    })
};

exports.getAllUniqueCategories = (req, res) =>{
    Product.distinct("category",{},(err, category)=>{
        if(err){
            return res.status(400).json({
                error:"No Category Found"
            })
        }
        res.json(category)
    })
};

//BulkWrite for updating sold and stock
exports.updateStock = (req, res, next) =>{
    let myOperations = req.body.order.products.map(prod =>{
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold:+prod.count}}
            }
        }
    })

                        //operations,options, callback
    Product.bulkWrite(myOperations,{}, (err, products)=>{
        if(err){
            return res.status(400).json({
                error: "Bulk Operation Failed"
            })
        }
        next();
    })
};