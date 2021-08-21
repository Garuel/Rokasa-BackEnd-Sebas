const proveedorMethod = {};
const Proveedor = require("../models/proveedor.model");
const acc = require("../middlewares/accessControl");
const fs = require("fs");
const path = require("path");

function getProveedor(_id) {
  try {
    return Proveedor.findById(_id);
  } catch (error) {
    return false;
  }
}

proveedorMethod.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    if (proveedores) {
      return res.status(200).json({
        status: true,
        proveedores,
        message: "Proveedores encontrados",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No se encuentran Proveedores",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "No se encuentran Proveedores",
    });
  }
};

proveedorMethod.getProveedor = async (req, res) => {
    try {
      const proveedorID = req.params.id;
      if (proveedorID) {
        const proveedor = await getProveedor(proveedorID);
        if (proveedor) {
          return res.status(200).json({
            status: true,
            proveedor,
            message: "Proveedor encontrado",
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "No se encontró el proveedor",
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
        message: "No se encontró el Proveedor",
      });
    }
};

proveedorMethod.createProveedor = async (req, res) => {

  /*const permission = acc.can(req.user.rol.name).createAny("proveedor").granted;
  if (permission) {*/
    const { DNI, nombre, apellido, empresa, descripcion_Empresa } = req.body;
    if (DNI && nombre && apellido && empresa && descripcion_Empresa) {
      const proveedor = new Proveedor({
          DNI,
          nombre,
          apellido,
          empresa,
          descripcion_Empresa
      });
      await proveedor.save();
      return res.status(200).json({
        status: true,
        message: "Proveedor Creado",
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


proveedorMethod.updateProveedor = async (req, res) => {

  /* const permission = acc.can(req.user.rol.name).updateAny("customer").granted;
   if (permission) {*/
     const {
       proveedorID,
       DNI,
       nombre,
       apellido,
       empresa,
       descripcion_Empresa
     } = req.body;
     if (proveedorID ) {
       const proveedor = await getProveedor({ _id: proveedorID });
       if (proveedor) {

         const toUpdateProveedor = {};
         DNI ? (toUpdateProveedor.DNI = DNI) : false;
         nombre ? (toUpdateProveedor.nombre = nombre) : false;
         apellido ? (toUpdateProveedor.apellido = apellido) : false;
         empresa ? (toUpdateProveedor.empresa = empresa) : false;
         descripcion_Empresa ? (toUpdateProveedor.descripcion_Empresa = descripcion_Empresa) : false;
         try {
           await proveedor.updateOne({
             $set: toUpdateProveedor,
           });
           return res.status(200).json({
             status: true,
             message: "Proveedor Actualizado",
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
           message: "Proveedor no encontrado",
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
proveedorMethod.deleteProveedor = async (req, res) => {
   /*const permission = acc.can(req.user.rol.name).deleteAny("customer").granted;
   if (permission) {*/
     try {
       const { proveedorID } = req.body;
       if (proveedorID) {
         const proveedor = await getProveedor({ _id: proveedorID });
         if (proveedor) {
           try {
             await proveedor.remove();
             return res.status(200).json({
               status: true,
               message: "Proveedor Eliminado",
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
             message: "No se encontró el Proveedor",
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

module.exports = proveedorMethod;