import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import dotenv from "dotenv";

dotenv.config();

var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

const SecretsSchema = new mongoose.Schema({
  secret: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

SecretsSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ["secret"] });

const Secrets = mongoose.model("Secrets", SecretsSchema);
export default Secrets;