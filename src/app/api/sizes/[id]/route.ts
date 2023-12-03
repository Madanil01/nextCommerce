import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Size from "@/models/sizeModel"

connect();

//get memory by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sizeId = params.id;
try {
    const size = await Size.findOne({ _id: sizeId });
    if (size) {
      return NextResponse.json({
        message: "size found",
        status:200,
        data: size,
      });
    } else {
      return NextResponse.json(
        { message: "size not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//update memory
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sizeId = params.id;

  try {
    // Assuming the request body contains the updated memory data
    const { sizeData } = await request.json();

    // Validate that at least one attribute (e.g., name) is present for updating
    if (!sizeData) {
      return NextResponse.json(
        {
          error:
            "At least one attribute (e.g., size) is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the memory by ID
    const size = await Size.findOne({ _id: sizeId });

    if (size) {
      // Update the memory with the provided data
      size.sizeData = sizeData;
      // Add more attributes here if needed

      // Save the updated memory
      await size.save();

      return NextResponse.json({
        message: "size updated",
        status: 200,
        data: size,
      });
    } else {
      return NextResponse.json(
        { message: "size not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete memory
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sizeId = params.id;

  try {
    // Find the memory by ID
    const size = await Size.findOne({ _id: sizeId });

    if (size) {
      // Delete the memory
      await size.deleteOne();

      return NextResponse.json({
        message: "size deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "size not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}