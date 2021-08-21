const express = require("express");
const router = express.Router();
const {
  getVentas,
  getVenta,
  createVenta,
  updateVenta,
  deleteVenta,
} = require("../controllers/venta.controller");
const auth = require("../middlewares/authMiddleware");
router
  .get("/getVenta/:id", getVenta)
  .get("/getVentas", getVentas)
  .post("/createVenta", createVenta)
  .put("/updateVenta", updateVenta)
  .delete("/deleteVenta", deleteVenta);

module.exports = router;
