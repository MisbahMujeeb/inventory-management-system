const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is Required"],
        unique: true,
    },
    productQuantity: {
        type: Number,
    },
    productPrice: {
        type: Number,
        required: [true, "Price is Required"],
    },
    productManufacturer: {
        type: String,
        required: [true, "Manufacturer is Required"],
    },
    productDescription: {
        type: String,
        required: [true, "Description is Required"],
    },
    // userIdInProducts: {
    //     type: String,
    //     // required: [true, "Product Name is Required"],
    //     // unique: true,
    // },
});

module.exports = mongoose.model("Products", productsSchema);