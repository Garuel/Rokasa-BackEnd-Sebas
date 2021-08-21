const express = require("express");
const router = express.Router();
const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");
const auth = require("../middlewares/authMiddleware");
    
router
    .get("/getProduct/:id", getProduct)
    .get("/getProducts", getProducts)
    .post(
        "/createProduct", createProduct
    )
    .put("/updateProduct", updateProduct)
    .delete("/deleteProduct", deleteProduct)


    /*
    .post(
        "/createProduct", auth, createProduct
    )
    .put("/updateProduct", auth, updateProduct)
    .delete("/deleteProduct", auth, deleteProduct)
*/

module.exports = router;