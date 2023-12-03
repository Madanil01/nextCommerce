import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
  categoryId: {
    type: String,
    require: [true, "Please Provide a CategoryId"],
  },
});

const SubCategory =
  mongoose.models.subcategorys || mongoose.model("subcategorys", subCategorySchema);
export default SubCategory;
