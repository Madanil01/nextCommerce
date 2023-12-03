import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import PesananDetail from "@/models/pesananDetailModel";

connect();


//get all pesananDetail
export async function GET(request: NextRequest) {
    try {
        const pesananDetail = await PesananDetail.find();
        return NextResponse.json({ pesananDetail });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}

//post pesanan Detsil
export async function POST(request: NextRequest) {
  try {
    const { pesananId, productId, variasiId, jumlah, hargaSatuan, subtotal } =
      await request.json();
    if (
      !pesananId ||
      !productId ||
      !variasiId ||
      !jumlah ||
      !hargaSatuan ||
      !subtotal
    ) {
      return NextResponse.json(
        { error: "All Data attributes are required." },
        { status: 400 }
      );
    }
    const newPesananDetail = await PesananDetail.create({
      pesananId,
      productId,
      variasiId,
      jumlah,
      hargaSatuan,
      subtotal,
    });
    const response = {
      pesananDetail: newPesananDetail,
      status: 201,
      message: "Pesanan Detail Created",
    };
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}