import express from "express";
import path from "path";
import multer from "multer";
import { error } from "console";

const uploadRoutes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/products'); },

    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webep/;
    const mimetypes = /image\/jpe?g|image\/png|image\webep/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if(filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only"), false);
    }
}

const upload = multer({storage, fileFilter});
const uploadSingleImage = upload.single('image');

uploadRoutes.post("/", (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if(err) {
            res.status(400).send( { message : err.message } );
        } else if(req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`
            })
        } else {
            res.status(400).send( { message : "No image file provided" } );
        }
    })
});

export default uploadRoutes;