import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Color from "@/models/colorModel"

connect();

//get color by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const colorId = params.id;
try {
    const color = await Color.findOne({ _id: colorId });
    if (color) {
      return NextResponse.json({
        message: "color found",
        status:200,
        data: color,
      });
    } else {
      return NextResponse.json(
        { message: "color not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//update colo by id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const colorId = params.id;

  try {
    // Assuming the request body contains the updated category data
    const { name,code } = await request.json();

    // Validate that at least one attribute (e.g., name) is present for updating
    if (!name || !code) {
      return NextResponse.json(
        {
          error:
            "At least one attribute (e.g., name) is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the category by ID
    const color = await Color.findOne({ _id: colorId });

    if (color) {
      // Update the category with the provided data
      color.name = name;
      color.code = code;
      // Add more attributes here if needed

      // Save the updated color
      await color.save();

      return NextResponse.json({
        message: "Color updated",
        status: 200,
        data: color,
      });
    } else {
      return NextResponse.json(
        { message: "Color not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete color
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const colorId = params.id;

  try {
    // Find the color by ID
    const color = await Color.findOne({ _id: colorId });

    if (color) {
      // Delete the category
      await color.deleteOne();

      return NextResponse.json({
        message: "Color deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "Color not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}