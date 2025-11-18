import Propiedades from "./Propiedades.js";
import Precios from "./Precios.js";
import Categorias from "./Categorias.js";
import Usuarios from "./Usuarios.js";

Propiedades.belongsTo(Precios, { foreignKey: "preciosId" });
Propiedades.belongsTo(Categorias, { foreignKey: "categoriasId" });
Propiedades.belongsTo(Usuarios, { foreignKey: "usuarioId" });

export { Propiedades, Precios, Categorias, Usuarios};