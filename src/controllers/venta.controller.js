const ventaMethod = {};
const Venta = require("../models/venta.model");
const Customer = require("../models/customer.model")
const acc = require("../middlewares/accessControl");
const fs = require("fs");
const path = require("path");

async function getVenta(param) {
  try {
    return User.findOne(param);
  } catch (error) {
    return false;
  }
}

async function getCustomer(_id) {
  try {
    return Customer.findById(_id);
  } catch (error) {
    return false;
  }
}

ventaMethod.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    if (ventas) {
      return res.status(200).json({
        status: true,
        ventas,
        message: "Ventas encontradas",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No se encontraron ventas",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Hubo un error",
    });
  }
};

ventaMethod.getVenta = async (req, res) => {
  try {
    const ventaID = req.params.id;
    if (ventaID) {
      const venta = await getVenta({ _id: ventaID });
      if (venta) {
        return res.status(200).json({
          status: true,
          venta,
          message: "Venta encontrada",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Venta no encontrada",
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

ventaMethod.createVenta = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).createAny("venta").granted;
  if (permission) {*/
    const { codigo, customerID, vendedor, monto } = req.body;
    if (codigo && customerID && vendedor && monto) {
      const customer = await getCustomer(customerID);
      const venta = new Venta({
        codigo,
        customer: {
          customerID: customer._id,
          nombre: customer.nombre,
        },
        vendedor,
        monto,
      });
      await venta.save();
      return res.status(200).json({
        status: true,
        message: "Venta Realizada",
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

ventaMethod.updateVenta = async (req, res) => {
    /*const permission = acc.can(req.user.rol.name).updateAny("venta").granted;
    if (permission) {*/
      const {
        ventaID,
        codigo,
        customer,
        vendedor,
        monto
      } = req.body;
      if (ventaID) {
        const venta = await getVenta({ _id: ventaID });
        if (venta) {

          const toUpdateVenta = {};
          codigo ? (toUpdateVenta.codigo = codigo) : false;
          customer ? (toUpdateVenta.customer = customer) : false;
          vendedor ? (toUpdateVenta.vendedor = vendedor) : false;
          monto ? (toUpdateVenta.monto = monto) : false;          
          try {
            await venta.updateOne({
              $set: toUpdateVenta,
            });
            return res.status(200).json({
              status: true,
              message: "Venta Actualizada",
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
            message: "Venta no encontrada",
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

}
ventaMethod.deleteVenta = async (req, res) => {
    /*const permission = acc.can(req.user.rol.name).deleteAny("venta").granted;
    if (permission) {*/
      try {
        const { ventaID } = req.body;
        if (ventaID) {
          const venta = await getVenta({ _id: ventaID });
          if (venta) {
            try {
              await venta.remove();
              return res.status(200).json({
                status: true,
                message: "Venta Eliminada",
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
              message: "No se encontró la venta",
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
}
module.exports = ventaMethod;
