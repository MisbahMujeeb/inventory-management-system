const mongoose = require("mongoose");

const StoresSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: [true, "Store Name is Required"],
        unique: true,
    },
    storeLocation: {
        type: String,
        required: [true, "storeLocation is Required"],
    },
    userId: {
        type: String,
        // required: [true, "Product Name is Required"],
        // unique: true,
    },
});

module.exports = mongoose.model("Stores", StoresSchema);