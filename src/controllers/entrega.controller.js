const entregaMethod = {};
const Entrega = require("../models/entrega.model");
const Pedido = require("../models/pedido.model");
const Proveedor = require("../models/proveedor.model");
const acc = require("../middlewares/accessControl");
const fs = require("fs");
const path = require("path");

async function getEntrega(param) {
  try {
    return Entrega.findOne(param);
  } catch (error) {
    return false;
  }
}

async function getPedido(_id) {
  try {
    return Pedido.findById(_id).populate(
      "productos.producto",
      "stock unidadVenta precioVenta precioCompra nombre"
    );
  } catch (error) {
    console.log("Error", error);
    return false;
  }
}

async function getProveedor(_id) {
  try {
    const pedido = Pedido.findById(_id);
    console.log(pedido.Proveedor);
    return pedido.Proveedor;
  } catch (error) {
    return false;
  }
}

entregaMethod.getEntregas = async (req, res) => {
  try {
    const entregas = await Entrega.find();
    if (entregas) {
      return res.status(200).json({
        status: true,
        entregas,
        message: "Entregas encontradas",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No se encontraron entregas",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Hubo un error",
    });
  }
};

entregaMethod.getEntrega = async (req, res) => {
  try {
    const entregaID = req.params.id;
    if (entregaID) {
      const entrega = await getEntrega({ _id: entregaID });
      if (entrega) {
        return res.status(200).json({
          status: true,
          entrega,
          message: "Entrega encontrada",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Entrega no encontrada",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "ID requerido",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Hubo un error",
    });
  }
};

entregaMethod.createEntrega = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).createAny("venta").granted;
      if (permission) {*/
  const { pedidoID } = req.body;
  if (pedidoID) {
    const pedido = await getPedido(pedidoID);
    const entrega = new Entrega({
      pedido: pedido,
    });
    //console.log(pedido.productos);
    await entrega.save();
    return res.status(200).json({
      status: true,
      message: "Entrega Creada",
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Rellenar todos los campos",
    });
  }
  /*} else {
        return res.status(400).json({
          status: false,
          message: "NO tiene permiso",
        });
      }*/
};

entregaMethod.updateEntrega = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).updateAny("venta").granted;
    if (permission) {*/
  const { entregaID, pedido } = req.body;
  if (entregaID) {
    const entrega = await getEntrega({ _id: entregaID });
    if (entrega) {
      const toUpdateEntrega = {};
      pedido ? (toUpdateEntrega.pedido = pedido) : false;
      try {
        await pedido.updateOne({
          $set: toUpdatePedido,
        });
        return res.status(200).json({
          status: true,
          message: "Entrega Actualizada",
        });
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: "Hubo un problema intentar nuevamente",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Entrega no encontrada",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "ID requerido",
    });
  }
  /*} else {
      return res.status(400).json({
        status: false,
        message: "NO puedes realizar esa acción",
      });
    }*/
};

module.exports = entregaMethod;
