const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
       required: [true, "Name is Required"],
      },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userSchemaLogin = new mongoose.Schema({
email: {
  type: String,
  required: [true, "Email is Required"],
  unique: true,
},
password: {
  type: String,
  required: [true, "Password is Required"],
},
});


userSchemaLogin.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
module.exports = mongoose.model("UsersLogin", userSchemaLogin);