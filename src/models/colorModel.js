import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
  code: {
    type: String,
    require: [true, "Please Provide a code"],
  },
});

const Color =
  mongoose.models.colors || mongoose.model("colors", colorSchema);
export default Color;
