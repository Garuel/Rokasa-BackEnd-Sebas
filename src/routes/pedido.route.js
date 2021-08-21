const express = require("express");
const router = express.Router();

const {
  getPedidos,
  getPedido,
  createPedido,
  updatePedidoProveedor,
  updatePedidoProductos,
  deletePedido
} = require("../controllers/pedido.controller");

const auth = require("../middlewares/authMiddleware");

router
  .get("/getPedido/:id", getPedido)
  .get("/getPedidos", getPedidos)
  .post("/createPedido", createPedido)
  .put("/updatePedidoProveedor", updatePedidoProveedor)
  .put("/updatePedidoProductos", updatePedidoProductos)
  .delete("/deletePedido", deletePedido)


module.exports = router;