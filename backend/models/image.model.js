import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";

const ImageSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

const ImageModel = model("imageModel", ImageSchema);

export default ImageModel;
