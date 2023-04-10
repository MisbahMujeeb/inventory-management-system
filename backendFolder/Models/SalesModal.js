const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    salesProductsId:{
        type: String,
        required: [true, "Product Id is Required"],
        unique: true,
    } ,
    salesStoreId:{
        type: String,
        required: [true, "Store Id is Required"],
    } ,
     salesQuantity:{
        type: Number,
        required: [true, "Quantity is Required"],
    } ,
     salesPrice :{
        type: Number,
        required: [true, "Price is Required"],
    },
    salesDate : {
        type: String,
        required: [true, "Date is Required"],
    },
    userId:{
        type: String,
    }
})
module.exports = mongoose.model("SalesItem", SalesSchema);