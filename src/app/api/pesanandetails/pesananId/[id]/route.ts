import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import PesananDetail from "@/models/pesananDetailModel";

connect();


//get all pesanandetail by id
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const pesananId = params.id;
    try {
        const pesananDetail = await PesananDetail.find({ pesananId: pesananId });
        if (PesananDetail) {
          return NextResponse.json({
            message: "pesanaqnDetail found",
            status: 200,
            data: pesananDetail,
          });
        } else {
          return NextResponse.json(
            { message: "color not found" },
            { status: 404 }
          );
        }
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

//update pesanandetail by id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pesannanId = params.id;

  try {
    // Assuming the request body contains the updated pesanandetail data
    const { pesananId, productId, variasiId, jumlah, hargaSatuan, subtotal } =
      await request.json();

    // Validate that at least one attribute is present for updating
    if (
      !pesananId ||
      !productId ||
      !variasiId ||
      !jumlah ||
      !hargaSatuan ||
      !subtotal
    ) {
      return NextResponse.json(
        {
          error: "At least one attribute is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the pesanandetail by ID
    const pesanandetail = await PesananDetail.findOne({ pesananId: pesananId });

    if (pesanandetail) {
      // Update the pesanandetail with the provided data
      pesanandetail.pesananId = pesananId;
      pesanandetail.productId = productId;
      pesanandetail.variasiId = variasiId;
      pesanandetail.jumlah = jumlah;
      pesanandetail.hargaSatuan = hargaSatuan;
      pesanandetail.subtotal = subtotal;
      // Add more attributes here if needed

      // Save the updated pesanandetail
      await pesanandetail.save();

      return NextResponse.json({
        message: "Pesanandetail updated",
        status: 200,
        data: pesanandetail,
      });
    } else {
      return NextResponse.json(
        { message: "Pesanandetail not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete pesanandetail by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pesananId = params.id;

  try {
    // Delete pesanandetails by pesananId
    const deleteResult = await PesananDetail.deleteMany({
      pesananId: pesananId,
    });

    if (deleteResult.deletedCount > 0) {
      return NextResponse.json({
        message: "Pesanandetails deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "Pesanandetails not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
