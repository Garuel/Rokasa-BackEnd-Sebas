const productMethod = {};
const Product = require("../models/product.model");
const acc = require("../middlewares/accessControl");
const fs = require("fs");
const path = require("path");

function getProduct(_field) {
  try {
    return Product.findOne(_field);
  } catch (error) {
    return false;
  }
}

productMethod.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      return res.status(200).json({
        status: true,
        products,
        message: "Products find",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No products found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "No products found",
    });
  }
};

productMethod.getProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    if (productID) {
      const product = await getProduct({ _id: productID });
      if (product) {
        return res.status(200).json({
          status: true,
          product,
          message: "Product found.",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "No product found",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "The ID is required.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "No product found",
    });
  }
};

productMethod.createProduct = async (req, res) => {/*
  const permission = acc.can(req.user.rol.name).createAny("product").granted;
  if (permission) {*/
    const {
      nombre,
      stock,
      unidadVenta,
      precioVenta,
      precioCompra,
      sku,
    } = req.body;
    if (
      nombre &&
      stock &&
      unidadVenta &&
      precioVenta &&
      precioCompra &&
      sku
    ) {
      const product = new Product({
        nombre,
        stock,
        unidadVenta,
        precioVenta,
        precioCompra,
        sku,
      });
      await product.save();
      return res.status(200).json({
        status: true,
        message: "Producto Creado",
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

productMethod.updateProduct = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).updateAny("product").granted;
  if (permission) {*/
    const {
      productID,
      nombre,
      stock,
      unidadVenta,
      precioVenta,
      precioCompra,
      sku,
    } = req.body;
    if (productID) {
      const product = await getProduct({ _id: productID });
      if (product) {
        if (sku && sku !== product.sku) {
          const verifySKU = await getProduct({ sku: sku });
          if (verifySKU) {
            return res.status(400).json({
              status: false,
              message: "Codigo SKU no disponible",
            });
          }
        }

        const toUpdateProduct = {};
        nombre ? (toUpdateProduct.nombre = nombre) : false;
        stock ? (toUpdateProduct.stock = stock) : false;
        unidadVenta ? (toUpdateProduct.unidadVenta = unidadVenta) : false;
        precioVenta ? (toUpdateProduct.precioVenta = precioVenta) : false;
        precioCompra ? (toUpdateProduct.precioCompra = precioCompra) : false;
        sku ? (toUpdateProduct.sku = sku) : false;

        try {
          await product.updateOne({
            $set: toUpdateProduct,
          });
          return res.status(200).json({
            status: true,
            message: "Producto Actualizado",
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
          message: "Producto no encontrado",
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

productMethod.deleteProduct = async (req, res) => {
  /*const permission = acc.can(req.user.rol.name).deleteAny("product").granted;
  if (permission) {*/
    try {
      const { productID } = req.body;
      if (productID) {
        const product = await getProduct({ _id: productID });
        if (product) {
          try {
            await product.remove();
            return res.status(200).json({
              status: true,
              message: "Producto Eliminado",
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
            message: "No se encontró el producto",
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
module.exports = productMethod;
