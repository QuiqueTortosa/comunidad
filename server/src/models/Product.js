import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgURL: String,
  },
  {
    timestamps: true, //Guarda el tiempo de modificacion
    versionKey: false //No crea el _v
  }
);

export default model("Product", productSchema);