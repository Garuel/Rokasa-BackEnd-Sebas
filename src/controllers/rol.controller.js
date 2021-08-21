const rolMethod = {};
const Rol = require("../models/rol.model");
const acc = require("../middlewares/accessControl");

async function getRol(_id) {
  try {
    return Rol.findById(_id);
  } catch (error) {
    return false;
  }
}

rolMethod.getRols = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).readAny("rol").granted;
  if (permission) {*/
    try {
      const roles = await Rol.find();
      if (roles) {
        return res.status(200).json({
          status: true,
          roles,
          message: "Rol encontrado",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "No se encontró el rol",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "No se encontró el rol",
      });
    }
  /*} else {
    return res.status(400).json({
      status: false,
      message: "No puedes realizar esta acción",
    });
  }*/
};

rolMethod.getRol = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).readAny("rol").granted;
  if (permission) {*/
    try {
      const rolID = req.params.id;
      if (rolID) {
        const rol = await getRol(rolID);
        if (rol) {
          return res.status(200).json({
            status: true,
            rol,
            message: "Rol encontrado",
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "No se encontró el rol",
          });
        }
      } else {
        return res.status(400).json({
          status: false,
          message: "rol ID requerido",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "No se encontró el rol",
      });
    }
  /*} else {
    return res.status(400).json({
      status: false,
      message: "No puedes hacer eso",
    });
  }*/
};

rolMethod.createRol = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).createAny("rol").granted;
  if (permission) {*/
    const { name } = req.body;
    if (name) {
      const verify = Object.values(roles).some((rol) => {
        return rol === name;
      });

      if (verify) {
        const rol = new Rol({
          name,
        });
        if (await rol.save()) {
          return res.status(201).json({
            status: true,
            message: "Rol Creado",
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "Hubo un problema, intentar nuevamente",
          });
        }
      } else {
        return res.status(400).json({
          status: false,
          message: "No permitido",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Llenar todos los campos",
      });
    }
  /*}else{
      return res.status(400).json({
        status: false,
        message:"No puedes acceder a esa función"
      });
  }*/
};

rolMethod.updateRol = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).updateAny("rol").granted;
  if (permission) {*/
    const { rolID, name } = req.body;
    if (rolID && name) {
      try {
        const rol = await getRol(rolID);
        if (rol) {
          const verify = Object.values(rols).some((rol) => {
            return rol === name;
          });
          if (!verify) {
            return res.status(400).json({
              status: false,
              message: "Nombre no permitido",
            });
          }

          if (
            await rol.updateOne({
              name,
            })
          ) {
            return res.status(200).json({
              status: true,
              message: "Rol actualizado",
            });
          } else {
            return res.status(400).json({
              status: false,
              message: "Hubo un problema, intenta nuevamente",
            });
          }
        } else {
          return res.status(400).json({
            status: false,
            message: "No se encontró el rolID",
          });
        }
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: "Hubo un problema, intenta nuevamente",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Rellenar todos los campos",
      });
    }
  /*} else {
    return res.status(400).json({
      status: false,
      message: "No puedes realizar esa acción",
    });
  }*/
};

rolMethod.deleteRol = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).deleteAny("rol").granted;
  if (permission) {*/
    const { rolID } = req.body;
    if (rolID) {
      try {
        const rol = await getRol(rolID);
        if (rol) {
          if (await rol.deleteOne()) {
            return res.status(200).json({
              status: true,
              message: "Rol eliminado",
            });
          } else {
            return res.status(400).json({
              status: false,
              message: "Hubo un problema, intenta nuevamente",
            });
          }
        } else {
          return res.status(400).json({
            status: false,
            message: "No se encontró el rolID",
          });
        }
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: "Hubo un problema, intenta nuevamente",
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
      message: "No puedes realizar esa acción",
    });
  }*/
};

module.exports = rolMethod;
