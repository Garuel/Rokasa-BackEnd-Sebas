const pedidoMethod = {};
const Pedido = require("../models/pedido.model");
const Product = require("../models/product.model");
const Proveedor = require("../models/proveedor.model");
const acc = require("../middlewares/accessControl");
const fs = require("fs");
const path = require("path");

async function getPedido(param) {
  try {
    return Pedido.findOne(param);
  } catch (error) {
    return false;
  }
}

async function getProveedor(_id) {
  try {
    return Proveedor.findById(_id);
  } catch (error) {
    return false;
  }
}

pedidoMethod.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("productos.producto", "nombre");
    if (pedidos) {
      return res.status(200).json({
        status: true,
        pedidos,
        message: "Pedidos encontrados",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No se encontraron pedidos",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Hubo un error",
    });
  }
};

pedidoMethod.getPedido = async (req, res) => {
  try {
    const pedidoID = req.params.id;
    if (pedidoID) {
      const pedido = await getPedido({ _id: pedidoID });
      if (pedido) {
        return res.status(200).json({
          status: true,
          pedido,
          message: "Pedido encontrado",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Pedido no encontrado",
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

pedidoMethod.createPedido = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).createAny("venta").granted;
    if (permission) {*/
  const { proveedorID, items } = req.body;
  if (proveedorID && items) {
    const proveedor = await getProveedor(proveedorID);
    const pedido = new Pedido({
      proveedor: {
        proveedorID: proveedor._id,
        nombre: proveedor.nombre,
        apellido: proveedor.apellido,
        empresa: proveedor.empresa,
        descripcion_Empresa: proveedor.descripcion_Empresa,
      },
      productos: items.map(item => {
        return {
          producto: item.productoID,
          cantidad: item.cantidad,
        }
      }),
    });

    await pedido.save();
    return res.status(200).json({
      status: true,
      message: "Pedido Creado",
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

pedidoMethod.updatePedidoProveedor = async (req, res) =>{
  const {pedidoID, proveedor} = req.body;
  if (pedidoID){
    const pedido= await getPedido({ _id: pedidoID});
    if(pedido){
      try{
        const toUpdatePedido = {};

        if (proveedor) {
          Object.keys(proveedor).forEach(function (key) {
            toUpdatePedido["proveedor." + key] = proveedor[key];
            // console.log('Key : ' + key + ', Value : ' + proveedor[key])
          });
          // PARA COMENTAR UN BLOQUE, SE PRESIONA CTRL K + CTRL C(COMMENT)
          // toUpdatePedido.proveedor = {
          //   ...proveedor
          // }
          console.log("pedido:", toUpdatePedido);
        }

        await pedido.updateOne({
          $set: toUpdatePedido,
        });
        return res.status(200).json({
          status: true,
          message: "Pedido Actualizado",
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
        message: "Pedido no encontrado",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "ID requerido",
    });
  }
}
pedidoMethod.updatePedidoProductos = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).updateAny("venta").granted;
  if (permission) {*/
  const { pedidoID, proveedor, productos } = req.body;
  if (pedidoID) {
    const pedido = await getPedido({ _id: pedidoID });
    if (pedido) {
      try {
        if (productos) {
          productos.forEach(async (producto) => {
            console.log("producto: ", producto);

            await Pedido.updateOne(
              {
                _id: pedidoID,
                "productos.producto": producto.producto,
              },
              {
                $set: {
                  "productos.$.cantidad": producto.cantidad,
                },
              }
            );
          });
        }

        return res.status(200).json({
          status: true,
          message: "Pedido Actualizado",
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
        message: "Pedido no encontrado",
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

pedidoMethod.deletePedido = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).deleteAny("venta").granted;
  if (permission) {*/
  try {
    const { pedidoID } = req.body;
    if (pedidoID) {
      const pedido = await getPedido({ _id: pedidoID });
      if (pedido) {
        try {
          await pedido.remove();
          return res.status(200).json({
            status: true,
            message: "Pedido Eliminado",
          });
        } catch (error) {
          return res.status(400).json({
            status: false,
            message: "Hubo un problema, intentar nuevamente",
          });
        }
      } else {
        return res.status(400).json({
          status: false,
          message: "No se encontró el pedido",
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
      message: "Hubo un problema, intentar nuevamente",
    });
  }
  /*} else {
    return res.status(400).json({
      status: false,
      message: "No puedes realizar esa acción",
    });
  }*/
};

module.exports = pedidoMethod;
