import express from "express";
import {
  addImage,
  addProduct,
  editProduct,
  getAllImages,
  getImage,
  getProduct,
  getSingleProduct,
} from "../controllers/product.controller.js";

import multer from "multer";

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

const router = express.Router();

router.get("/products", getProduct);

router.post("/addproduct", addProduct);

router.get("/product/:id", getSingleProduct);

router.put("/product/:id", editProduct);

router.post("/upload", upload, addImage);

router.get("/upload/:id", getImage);

router.get("/upload", getAllImages);

export default router;
