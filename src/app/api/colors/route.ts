import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Color from "@/models/colorModel";

// Initialize multer with your desired configuration
connect();

//get all category
export async function GET(request: NextRequest) {
  try {
    const color = await Color.find(); // Mengambil semua produk dari database
    return NextResponse.json({ color });
  } catch (error) {
    console.error("Error while trying to fetch color\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

//add color
export async function POST(request: NextRequest) {
  try {
    // Assuming the request body contains the product data
    const { name, code } = await request.json();

    // Validate that the required attribute (name) is present
    if (!name || !code) {
      return NextResponse.json(
        { error: "Name & Code attribute is required." },
        { status: 400 }
      );
    }

    // Create a new category with the provided name
    const newColor = await Color.create({ name, code });

    return NextResponse.json({ color: newColor });
  } catch (error) {
    console.error("Error while trying to create color\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
