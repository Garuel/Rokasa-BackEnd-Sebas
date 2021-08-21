const userMethods = {};
require("dotenv").config({ path: __dirname + "/.env" });
const User = require("../models/user.model");
const Rol = require("../models/rol.model");
const jwt = require("jsonwebtoken");

async function getUser(param) {
  try {
    return User.findOne(param);
  } catch (error) {
    return false;
  }
}

async function getRol(_id) {
  try {
    return Rol.findById(_id);
  } catch (error) {
    return false;
  }
}

userMethods.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser({ email });
  if (user) {
    const verifyPassword = await user.verifyPassword(password);
    if (!verifyPassword) {
      return res.status(400).json({
        status: false,
        message: "Email o Password incorrecto",
      });
    }
    try {
      const token = jwt.sign(user._id.toString(), process.env.PRIVATE_KEY);

      return res.status(200).json({
        status: true,
        token,
        message: "Login correcto",
      });
    } catch (error) {
      return res.status(400).json({
        status: true,
        message: "Error",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "Usuario no encontrado",
    });
  }
};

userMethods.register = async (req, res) => {
  const { rolID, nombre, apellido, email, password, phone } = req.body;
  if (rolID && nombre, apellido && email && password, phone) {
    const rol = await getRol(rolID)
    if(rol){

      const verifyEmail = await getUser({ email });
      if (verifyEmail) {
        return res.status(400).json({
          status: false,
          message: "El Email ya existe",
        });
      }
      const user = new User({
        rol: {
          rolID: rol._id,
          name: rol.name,
        },
        nombre,
        apellido,
        email,
        password,
        phone,
      });
      user.password = await user.encryptPassword(user.password);
  
      if (await user.save()) {
        return res.status(200).json({
          status: true,
          message: "Usuario Creado.",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Hubo un problema, intentar nuevamente",
        });
      }
    }else{
      return res.status(400).json({
        status:false,
        message:"El rol no existe"
      })
    }

  } else {
    return res.status(400).json({
      status: false,
      message: "Rellenar todos los campos",
    });
  }
};

userMethods.authenticate = (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const verify = jwt.verify(token, process.env.PRIVATE_KEY);
      if (verify) {
        return res.status(200).json({
          status: true,
          message: "Token Correcto",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Token Incorrecto",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Token requerido",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Token Invalid",
    });
  }
};

module.exports = userMethods;
