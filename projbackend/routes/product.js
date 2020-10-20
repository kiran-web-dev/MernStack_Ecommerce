const express =require("express")
const router =express.Router()
const { check, validationResult } = require("express-validator");

const {getProductById, createProduct} =require("../controllers/product")
const { getUserById } =require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} =require("../controllers/auth");
const { options } = require("./auth");

//Params
router.param("userId", getUserById);
router.param("productId",getProductById);

//Actual routes

//create
router.post(
    "/product/create/:userId",
    [
        check("name", "name should be atleast 3 char").isLength({ min: 3 }),
        check("price", "Price Shuould be number").isNumeric(),
        check("description", "description should be atleast 5 char").isLength({ min: 5 }),
        check("stock", "stock should be number").isNumeric(),
        //check("category", "category should be atleast 5 char").isLength({ min: 5 }),
    ],
    isSignedIn,isAuthenticated,isAdmin,
    createProduct
);

//update

//remove

module.exports = router;