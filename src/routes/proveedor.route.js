const express = require("express");
const router = express.Router();
const {
    getProveedor,
    getProveedores,
    createProveedor,
    updateProveedor,
    deleteProveedor,
} = require("../controllers/proveedor.controller");
const auth = require("../middlewares/authMiddleware");

router
    .get("/getProveedor/:id", getProveedor)
    .get("/getProveedores", getProveedores)
    .post("/createProveedor", createProveedor)
    .put("/updateProveedor", updateProveedor)
    .delete("/deleteProveedor", deleteProveedor);

    /*
        .post("/createProveedor", auth, createProveedor)
    .put("/updateProveedor", auth, updateProveedor)
    .delete("/deleteProveedor", auth, deleteProveedor);
    */

module.exports = router;