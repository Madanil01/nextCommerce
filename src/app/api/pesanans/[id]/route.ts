import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Pesanan from "@/models/pesananModel";

connect();

//get pesanan by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pesananId = params.id;
  try {
    const pesanan = await Pesanan.findOne({ _id: pesananId });
    if (pesanan) {
      return NextResponse.json({
        message: "pesanan found",
        status: 200,
        data: pesanan,
      });
    } else {
      return NextResponse.json(
        { message: "pesanan not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//update pesanan by id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pesananId = params.id;

  try {
    // Assuming the request body contains the updated category data
    const { userId, statusPesanan, total } = await request.json();

    // Validate that at least one attribute (e.g., name) is present for updating
    if (!userId || !statusPesanan || !total) {
      return NextResponse.json(
        {
          error:
            "At least one attribute (e.g., name) is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the category by ID
    const pesanan = await Pesanan.findOne({ _id: pesananId });

    if (pesanan) {
      // Update the category with the provided data
      pesanan.userId = userId;
      pesanan.statusPesanan = pesanan.statusPesanan;
      pesanan.total = total;
      pesanan.updatePesanan = new Date();
      // Add more attributes here if needed

      // Save the updated color
      await pesanan.save();

      return NextResponse.json({
        message: "Pesanna updated",
        status: 200,
        data: pesanan,
      });
    } else {
      return NextResponse.json({ message: "Pesanna not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete pesanan by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pesananId = params.id;

  try {
    // Find the pesanan by ID
    const pesanan = await Pesanan.findOne({ _id: pesananId });

    if (pesanan) {
      // Delete the pesanan
      await pesanan.deleteOne();

      return NextResponse.json({
        message: "Pesanan deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "Pesanan not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
