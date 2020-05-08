// PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//CONECCION A LA BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/AF';
}
process.env.URLDB = urlDB;
//FIRMA DE JASON WEB TOKEN
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//TIEMPO EN EL QUE EXPIRA EL TOKEN
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';