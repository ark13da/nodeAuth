import mongoose from "mongoose";
import "../utils/esm.js";

const uri = process.env.ATLAS_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongoDB");
  } catch (e) {
    console.log(e);
  }
};

export default connect;
