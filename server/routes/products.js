const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middelwares/uploads");

// post products

router.post("/createProduct", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();

    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    product.photo = req.file.location;

    await product.save();

    res.json({
      status: true,
      message: "product saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
