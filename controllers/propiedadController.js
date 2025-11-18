import {Propiedades, Precios, Categorias, Usuarios} from "../models/index.js";
import { check, validationResult } from "express-validator";

const admin = (req, res) => {
  res.render("propiedades/admin", {
    tituloPagina: "Mis propiedades",
    csrfToken: req.csrfToken(),
    headerAdmin: true,
  });
};

const crear = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    Categorias.findAll(),
    Precios.findAll(),
  ]);

  res.render("propiedades/crear", {
    tituloPagina: "Crear una nueva propiedad",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: req.body,
    headerAdmin: true,
  });
};

const guardar = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    Categorias.findAll(),
    Precios.findAll(),
  ]);

  //Validaciones
  await check("titulo")
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .run(req);

  await check("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres")
    .run(req);

  await check("categoria")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isInt()
    .withMessage("La categoría no es válida")
    .run(req);

  await check("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isInt()
    .withMessage("El precio no es válido")
    .run(req);

  await check("habitaciones")
    .notEmpty()
    .withMessage("Las habitaciones son obligatorias")
    .isInt()
    .withMessage("No se han seleccionado habitaciones")
    .run(req);

  await check("parqueaderos")
    .notEmpty()
    .withMessage("Los parqueaderos son obligatorios")
    .isInt()
    .withMessage("No se han seleccionado parqueaderos")
    .run(req);

  await check("wc")
    .notEmpty()
    .withMessage("Los baños son obligatorios")
    .isInt()
    .withMessage("No se han seleccionado baños")
    .run(req);
  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Errores
    return res.render("propiedades/crear", {
      tituloPagina: "Crear Propiedad",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      datos: req.body,
    });
  }
  console.log("Enviando...");
};

export { admin, crear, guardar };
