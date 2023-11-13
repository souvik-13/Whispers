import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import dotenv from "dotenv";
import passportLocalMongoose from "passport-local-mongoose";

dotenv.config();

// const secret = process.env.SECRET;

const UsernameSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now(),
  }, 
});

// UsernameSchema.plugin(encrypt, {
//     secret: secret,
//     encryptedFields: ["password"],
//     });
UsernameSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UsernameSchema);
export default User;