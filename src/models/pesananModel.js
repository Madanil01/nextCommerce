import mongoose from "mongoose";

const pesananSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
  tanggalPesanan: {
    type: Date,
    require: [true, "Please Provide a Tanggal"],
  },
  statusPesanan: {
    type: String,
    require: [true, "Please Provide a Status"],
  },
  total: {
    type: Number,
    require: [true, "Please Provide a Total"],
  },
  updatePesanan: {
    type: Date,
    require: [true, "Please Provide a Tanggal"],
  },
});

const Pesanan =
  mongoose.models.pesanans || mongoose.model("pesanans", pesananSchema);
export default Pesanan;
