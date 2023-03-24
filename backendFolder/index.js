
const express = require('express')
const cors = require("cors");
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./Routes/AuthRoutes')
const cookieParser = require("cookie-parser");


app.listen(4000,() => {
  console.log(`Server Started at PORT 4000`);
});

mongoose.connect("mongodb+srv://newUser:newUser@cluster0.b8tymiw.mongodb.net/inventoryApp?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Connetion Successfull");
})
.catch((err) => {
  console.log(err.message);
});

app.use(
  cors({
    origin:["http://localhost:3000"],
    methods: ["GET" , "POST"],
    credentials: true
  })
)
app.use(cookieParser());

app.use(express.json())
app.use("/", authRoutes);