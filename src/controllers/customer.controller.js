const customerMethod = {};
const Customer = require("../models/customer.model");
const acc = require("../middlewares/accessControl");
const fs = require("fs");
const path = require("path");

function getCustomer(_id) {
  try {
    return Customer.findById(_id);
  } catch (error) {
    return false;
  }
}

customerMethod.getCustomers = async (req, res) => {
    try {
      const customers = await Customer.find();
      if (customers) {
        return res.status(200).json({
          status: true,
          customers,
          message: "Clientes encontrado",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "No se encuentran clientes",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "No se encuentran Clientes",
      });
    }
};

customerMethod.getCustomer = async (req, res) => {
    try {
      const customerID = req.params.id;
      if (customerID) {
        const customer = await getCustomer(customerID);
        if (customer) {
          return res.status(200).json({
            status: true,
            customer,
            message: "Cliente encontrado",
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "No se encontró el cliente",
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
        message: "No se encontró el Cliente",
      });
    }
};

customerMethod.createCustomer = async (req, res) => {

    /*const permission = acc.can(req.user.rol.name).createAny("customer").granted;
    if (permission) {*/
      const { DNI, nombre, apellido } = req.body;
      if (DNI && nombre && apellido) {
        const customer = new Customer({
            DNI,
            nombre,
            apellido
        });
        await customer.save();
        return res.status(200).json({
          status: true,
          message: "Cliente Creado",
        });
      }else {
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
}

customerMethod.updateCustomer = async (req, res) => {

   /* const permission = acc.can(req.user.rol.name).updateAny("customer").granted;
    if (permission) {*/
      const {
        customerID,
        DNI,
        nombre,
        apellido,
      } = req.body;
      if (customerID) {
        const customer = await getCustomer({ _id: customerID });
        if (customer) {

          const toUpdateCustomer = {};
          DNI ? (toUpdateCustomer.DNI = DNI) : false;
          nombre ? (toUpdateCustomer.nombre = nombre) : false;
          apellido ? (toUpdateCustomer.apellido = apellido) : false;
          try {
            await customer.updateOne({
              $set: toUpdateCustomer,
            });
            return res.status(200).json({
              status: true,
              message: "Cliente Actualizado",
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
            message: "Cliente no encontrado",
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
customerMethod.deleteCustomer = async (req, res) => {
    /*const permission = acc.can(req.user.rol.name).deleteAny("customer").granted;
    if (permission) {*/
      try {
        const { customerID } = req.body;
        if (customerID) {
          const customer = await getCustomer({ _id: customerID });
          if (customer) {
            try {
              await customer.remove();
              return res.status(200).json({
                status: true,
                message: "Cliente Eliminado",
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
              message: "No se encontró el cliente",
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
module.exports = customerMethod;