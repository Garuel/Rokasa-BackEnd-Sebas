const { Schema, model } = require("mongoose");
const bcrypy = require("bcryptjs");

const userSchema = new Schema({
  DNI: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  rol:{
    type: Object,
    required: true
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypy.compare(password, this.password);
};

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypy.genSalt(10);
  return bcrypy.hash(password, salt);
};

module.exports = model("User", userSchema);
