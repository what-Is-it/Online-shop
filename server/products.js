const express = require("express");
const productItem = require("./productSchema");

const getProducts = async (req, res) => {
  try {
    console.log("trying");
    await productItem.find().then((result) => res.send(result));
    console.log("OK");
    res.status(200);
  } catch (e) {
    console.log(e.message);
  }
};

const addProduct = async (req, res) => {
  const product = new productItem(req.body);
  console.log(product);
  console.log(req.body);
  await product
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const router = express.Router();
router.get("/", getProducts);
router.post("/", addProduct);

module.exports = router;
