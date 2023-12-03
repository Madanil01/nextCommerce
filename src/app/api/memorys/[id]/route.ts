import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Memory from "@/models/memoryModel"

connect();

//get memory by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const memoryId = params.id;
try {
    const memory = await Memory.findOne({ _id: memoryId });
    if (memory) {
      return NextResponse.json({
        message: "memory found",
        status:200,
        data: memory,
      });
    } else {
      return NextResponse.json(
        { message: "memory not found" },
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
  const memoryId = params.id;

  try {
    // Assuming the request body contains the updated memory data
    const { size } = await request.json();

    // Validate that at least one attribute (e.g., name) is present for updating
    if (!size) {
      return NextResponse.json(
        {
          error:
            "At least one attribute (e.g., size) is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the memory by ID
    const memory = await Memory.findOne({ _id: memoryId });

    if (memory) {
      // Update the memory with the provided data
      memory.size = size;
      // Add more attributes here if needed

      // Save the updated memory
      await memory.save();

      return NextResponse.json({
        message: "memory updated",
        status: 200,
        data: memory,
      });
    } else {
      return NextResponse.json(
        { message: "memory not found" },
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
  const memoryId = params.id;

  try {
    // Find the memory by ID
    const memory = await Memory.findOne({ _id: memoryId });

    if (memory) {
      // Delete the memory
      await memory.deleteOne();

      return NextResponse.json({
        message: "memory deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "memory not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}