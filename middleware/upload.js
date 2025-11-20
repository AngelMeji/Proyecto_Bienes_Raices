import multer from "multer";
import path from "path";

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/"); // Carpeta donde guardar imágenes
    },
    filename: function(req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Validar que SOLO entren imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Máximo 5MB por imagen
});

export default upload;
