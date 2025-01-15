import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
export const createOrder = async (req, res, next) => {
  try {
    const cardItems = req.body;

    const amount = Number(
      cardItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
    ).toFixed(2);

    const status = "pending";

    const order = await OrderModel.create({ cardItems, status, amount });

    //Updating Product Stock

    cardItems.forEach(async (item) => {
      const product = await ProductModel.findById(item.product._id);
      product.stock = product.stock - item.qty;
      await product.save();
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
