import bcrypt from "bcrypt";

const usuario = [
    {
        nombre: "J. Angel Mejia",
        email: "angel@gmail.com",
        confirmado: 1,
        password: bcrypt.hashSync("142536", 10),
    },
    {
        nombre: "Tamarindo Tamayo",
        email: "info@test.com",
        confirmado: 1,
        password: bcrypt.hashSync("123456", 10),
    },
];

export default usuario;