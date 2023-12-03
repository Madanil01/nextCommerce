import mongoose from "mongoose";

const pesananDetailSchema = new mongoose.Schema({
  pesananId: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
  productId: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
  variasiId: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
  jumlah: {
    type: Number,
    require: [true, "Please Provide a Name"],
  },
  hargaSatuan: {
    type: Number,
    require: [true, "Please Provide a Name"],
  },
  subtotal: {
    type: Number,
    require: [true, "Please Provide a Name"],
  },
});

const PesananDetail =
  mongoose.models.pesanandetails || mongoose.model("pesanandetails", pesananDetailSchema);
export default PesananDetail;
