import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel"

// Initialize multer with your desired configuration
connect();

//get all category
export async function GET(request: NextRequest) {
  try {
    const category = await Category.find(); // Mengambil semua produk dari database
    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error while trying to fetch category\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

//add subcategory
export async function POST(request: NextRequest) {
  try {
    // Assuming the request body contains the product data
    const { name } = await request.json();

    // Validate that the required attribute (name) is present
    if (!name) {
      return NextResponse.json(
        { error: "Name attribute is required." },
        { status: 400 }
      );
    }

    // Create a new category with the provided name
    const newCategory = await Category.create({ name });

    return NextResponse.json({ category: newCategory });
  } catch (error) {
    console.error("Error while trying to create category\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
