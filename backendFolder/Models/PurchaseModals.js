const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
    purchaseProductsId:{
        type: String,
        required: [true, "Product Id is Required"],
        unique: true,
    } ,
     purchaseQuantity:{
        type: Number,
        required: [true, "Quantity is Required"],
    } ,
     purchasePrice :{
        type: Number,
        required: [true, "Price Id is Required"],
    },
    purchaseDate : {
        type: String,
        required: [true, "Date Id is Required"],
    },
    userId:{
        type: String,
    }
})
module.exports = mongoose.model("PurchaseItem", PurchaseSchema);