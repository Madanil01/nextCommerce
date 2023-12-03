import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Size from "@/models/sizeModel";

// Initialize multer with your desired configuration
connect();

//get all category
export async function GET(request: NextRequest) {
  try {
    const size = await Size.find(); // Mengambil semua produk dari database
    return NextResponse.json({ size });
  } catch (error) {
    console.error("Error while trying to fetch size\n", error);
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
    const { sizeData } = await request.json();

    // Validate that the required attribute (size) is present
    if (!sizeData) {
      return NextResponse.json(
        { error: "Name attribute is required." },
        { status: 400 }
      );
    }

    // Create a new category with the provided size
    const newSize = await Size.create({ sizeData });

    return NextResponse.json({ size: newSize });
  } catch (error) {
    console.error("Error while trying to create size\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
