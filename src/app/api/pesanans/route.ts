import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Pesanan from "@/models/pesananModel";

connect();

//get all pesanan
export async function GET(request: NextRequest) {
  try {
    const pesanan = await Pesanan.find();
    return NextResponse.json({ pesanan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

//create pesanan
export async function POST(request: NextRequest) {
  try {
    const { userId, statusPesanan, total } = await request.json();
    if (!userId || !statusPesanan || !total) {
      return NextResponse.json(
        { error: "All Data attribute is required." },
        { status: 400 }
      );
    }
    const newPesanan = await Pesanan.create({
      userId,
      tanggalPesanan: new Date(),
      statusPesanan,
      total,
      updatePesanan: new Date(),
    });
    const response = {
      pesanan: newPesanan,
      status: 201,
      message: "Pesanan Created",
    };
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
