import express from "express";
import usuarioRoutes from "./routes/usuariosRoutes.js";
import db from "./config/db.js";

//Crear APP
const app = express();

// Conexion a DB
try {
    await db.authenticate();
    db.sync();
    console.log("La conexion es correcta a la db");
} catch (error) {
    console.error("No se puede conectar", error);
}

//Habilitar Letura de Formularios
app.use(express.urlencoded({extended: true}));

//Habilitar pug
app.set("view engine", "pug"); 
app.set('views', './views');

//Definir la ruta del public
app.use(express.static("public"));

//Routing
app.use("/auth", usuarioRoutes);

//Definir el Puerto
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("El servidor esta corriendo en el puerto: " + port);
});