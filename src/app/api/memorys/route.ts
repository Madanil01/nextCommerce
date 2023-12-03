import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Memory from "@/models/memoryModel"

// Initialize multer with your desired configuration
connect();

//get all category
export async function GET(request: NextRequest) {
  try {
    const memory = await Memory.find(); // Mengambil semua produk dari database
    return NextResponse.json({ memory });
  } catch (error) {
    console.error("Error while trying to fetch memory\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

//add category
export async function POST(request: NextRequest) {
  try {
    // Assuming the request body contains the product data
    const { size } = await request.json();

    // Validate that the required attribute (size) is present
    if (!size) {
      return NextResponse.json(
        { error: "Name attribute is required." },
        { status: 400 }
      );
    }

    // Create a new category with the provided size
    const newMemory = await Memory.create({ size });

    return NextResponse.json({ memory: newMemory });
  } catch (error) {
    console.error("Error while trying to create category\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
