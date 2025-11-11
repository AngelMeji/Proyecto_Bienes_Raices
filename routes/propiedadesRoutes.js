import express from "express";
import {admin} from "../controllers/propiedadController.js";

const router = express.Router();

// MIS PROPIEDADES 
router.get("/mis-propiedades", admin);

export default router;