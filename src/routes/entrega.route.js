const express = require("express");
const router = express.Router();
const {
  getEntregas,
  getEntrega,
  createEntrega,
  updateEntrega
} = require("../controllers/entrega.controller");
const auth = require("../middlewares/authMiddleware");
router
  .get("/getEntrega/:id", getEntrega)
  .get("/getEntregas", getEntregas)
  .post("/createEntrega", createEntrega)
  .put("/updateEntrega", updateEntrega)


module.exports = router;