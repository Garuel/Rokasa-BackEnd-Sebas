const AccessControl = require('accesscontrol');
const acc = new AccessControl();

acc.grant("ventas")
    .readAny("customer")
    .createAny("customer")
    .updateAny("customer")
    .deleteAny("customer");

acc.grant("ventas")
    .readAny("venta")
    .createAny("venta")
    .updateAny("venta")
    .deleteAny("venta");

acc.grant("inventario")
    .readAny("product")
    .createAny("product")
    .updateAny("product")
    .deleteAny("product");    

acc.grant("admin")
    .readAny("product")
    .createAny("product")
    .updateAny("product")
    .deleteAny("product");

acc.grant("admin")
    .readAny("rol")
    .createAny("rol")
    .updateAny("rol")
    .deleteAny("rol");
module.exports=acc;