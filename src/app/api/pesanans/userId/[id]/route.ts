import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Pesanan from "@/models/pesananModel";

connect();

//get pesanan by userId
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  try {
    const pesanan = await Pesanan.find({ userId: userId });
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
//update pesanan by UserId
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userParamId = params.id;

  try {
    // Assuming the request body contains the updated category data
    const { userId, statusPesanan, total } = await request.json();

    // Validate that at least one attribute (e.g., name) is present for updating
    if (!statusPesanan || !total) {
      return NextResponse.json(
        {
          error:
            "At least one attribute (e.g., name) is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the category by ID
    const pesanan = await Pesanan.findOne({ userId: userParamId });

    if (pesanan) {
      // Update the category with the provided data
      pesanan.userId = pesanan.userId;
      pesanan.statusPesanan = pesanan.statusPesanan;
      pesanan.total = total;
      pesanan.updatePesanan = new Date();
      // Add more attributes here if needed

      // Save the updated color
      await pesanan.save();

      return NextResponse.json({
        message: "Pesanan updated",
        status: 200,
        data: pesanan,
      });
    } else {
      return NextResponse.json(
        { message: "Pesanna not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete pesanan by userId
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  try {
    // Delete pesanan(s) by userId
    const deleteResult = await Pesanan.deleteMany({ userId: userId });

    if (deleteResult.deletedCount > 0) {
      return NextResponse.json({
        message: "Pesanan(s) deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "Pesanan(s) not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
