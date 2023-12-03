import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  size: {
    type: String,
    require: [true, "Please Provide a Size"],
  },
});

const Memory = mongoose.models.memorys || mongoose.model("memorys", memorySchema);
export default Memory;
