import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, daFa: products });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
};
