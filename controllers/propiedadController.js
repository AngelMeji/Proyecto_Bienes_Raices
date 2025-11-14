import { check, validationResult } from "express-validator";

const admin = (req, res) => {
  res.render("propiedades/admin", {
    tituloPagina: "Mis propiedades",
    csrfToken: req.csrfToken(),
    headerAdmin: true,
  });
};

const crear = (req, res) => {
  res.render("propiedades/crear", {
    tituloPagina: "Crear una nueva propiedad",
    csrfToken: req.csrfToken(),
    headerAdmin: true,
  });
};

const crearPropiedad = async (req, res) => {
  //Validaciones
  await check("titulo")
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .run(req);

  await check("descripcion")
    .notEmpty()
    .withMessage("El descripción no puede estar vacia")
    .run(req);

  await check("categoria")
    .equals(2)
    .withMessage("Lacategoria no puede estar vacia")
    .run(req);

  await check("precio")
    .equals(2)
    .withMessage("El precio no puede estar vacio")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Errores
    return res.render("/propiedades/crear", {
      tituloPagina: "Crear Categoria",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
    });
  }
};

export { admin, crear };
