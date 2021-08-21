const express = require("express");
const router = express.Router();
const {
    getRol,
    getRols,
    createRol,
    updateRol,
    deleteRol,
} = require("../controllers/rol.controller");
const auth = require("../middlewares/authMiddleware");

router
    .get("/getRol/:id", getRol)
    .get("/getRols", getRols)
    .post("/createRol", createRol)
    .put("/updateRol", updateRol)
    .delete("/deleteRol", deleteRol);


    /*
        .get("/getRol/:id",auth, getRol)
    .get("/getRols",auth, getRols)
    .post("/createRol", createRol)
    .put("/updateRol", auth, updateRol)
    .delete("/deleteRol", auth, deleteRol);
    */

module.exports = router;