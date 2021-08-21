const express = require("express");
const router = express.Router();
const {
    getCustomer,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require("../controllers/customer.controller");
const auth = require("../middlewares/authMiddleware");

router
    .get("/getCustomer/:id", getCustomer)
    .get("/getCustomers", getCustomers)
    .post("/createCustomer", createCustomer)
    .put("/updateCustomer", updateCustomer)
    .delete("/deleteCustomer", deleteCustomer);

    /*
        .post("/createCustomer", auth, createCustomer)
    .put("/updateCustomer", auth, updateCustomer)
    .delete("/deleteCustomer", auth, deleteCustomer);
    */

module.exports = router;