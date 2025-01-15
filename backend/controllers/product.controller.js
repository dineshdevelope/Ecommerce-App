import ProductModel from "../models/product.model.js";
import ImageModel from "../models/image.model.js";
import path from "path";
export const getProduct = async (req, res) => {
  try {
    // 1. Get the query parameters from the URL
    // 2. Check if the query parameter exists
    // 3. If it exists, use it to filter the products
    // 4. If it doesn't exist, return all the products
    // 5. Send the response back to the client

    //               To Search Functionality
    const query = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};

    const products = await ProductModel.find(query);

    // const products = await ProductModel.find(); // Fetch all the products from the database
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const singleProduct = await ProductModel.findById(req.params.id);
    res.status(201).json(singleProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const newProduct = new ProductModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    ratings: req.body.ratings,
    category: req.body.category,
    seller: req.body.seller,
    stock: req.body.stock,
    numOfReviews: req.body.numOfReviews,
    images: req.body.images,
  });

  try {
    const product = await newProduct.save();
    res.status(201).json(product);
    console.log("Product added successfully!", product);
  } catch (error) {
    console.error("Error saving product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    console.log("Edit");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addImage = async (req, res) => {
  /*  try {

    const newImage = new ImageModel({
      name: req.body.name,
      image: {
        data: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      },
    });
    const result = await newImage.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  } */
  try {
    console.log(req.file);
    const { path, filename } = req.file;
    const image = await ImageModel({ path, filename });
    await image.save();
    res.send({ msg: "Image Uploaded" });
  } catch (error) {
    res.send({ error: "Unable to upload Image" });
  }
};

const __dirname = path.resolve();
export const getImage = async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params.id);
    console.log(image);

    if (!image) res.send({ msg: "Image not found" });
    const imagePath = path.join(__dirname, "uploads", image.filename);
    res.sendFile(imagePath);
  } catch (error) {
    res.send({ error: "Unable to get Image" });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.status(200).json(images);
  } catch (error) {
    res.send({ error: "Unable to get All Images" });
  }
};
