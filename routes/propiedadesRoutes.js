import express from "express";
import { admin, crear, guardar } from "../controllers/propiedadController.js";
import protegerRuta from "../middleware/protegerRuta.js";
import { body } from "express-validator";

const router = express.Router();

// Mis propidades
router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, crear);
router.post("/propiedades/crear", protegerRuta, guardar);

export default router;
