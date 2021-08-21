const express= require('express');
const cors= require('cors');
const helmet= require('helmet');
const morgan= require('morgan');
const path = require('path');
const app = express();
require('./config/config');



//Más seguridad
app.use(helmet())

//Alow cors
app.use(cors())

//Set Module to help request information
app.use(morgan("combined"))

//Alow Json request
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(express.static('frontend'))
//Define static files access
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//configure routes
app.use('/user' , require('./routes/user.route'));
app.use('/rol' , require('./routes/rol.route'));
app.use('/product' , require('./routes/product.route'));
app.use('/customer' , require('./routes/customer.route'));
app.use('/venta' , require('./routes/venta.route'));
app.use('/proveedor' , require('./routes/proveedor.route'));
app.use('/pedido' , require('./routes/pedido.route'));
app.use('/entrega' , require('./routes/entrega.route'));
module.exports = app;