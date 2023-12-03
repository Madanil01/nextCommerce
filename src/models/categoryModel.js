import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
});

const Category = mongoose.models.categorys || mongoose.model("categorys", categorySchema);
export default Category;
