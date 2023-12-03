import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import SubCategory from "@/models/subCategoryModel"

// Initialize multer with your desired configuration
connect();

//get all category
export async function GET(request: NextRequest) {
  try {
    const subcategory = await SubCategory.find(); // Mengambil semua produk dari database
    return NextResponse.json({ subcategory });
  } catch (error) {
    console.error("Error while trying to fetch subcategory\n", error);
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
    const { name, categoryId } = await request.json();

    // Validate that the required attribute (name) is present
    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "Name  or Category attribute is required." },
        { status: 400 }
      );
    }

    // Create a new category with the provided name
    const newSubCategory = await SubCategory.create({ name, categoryId });

    return NextResponse.json({ subcategory: newSubCategory });
  } catch (error) {
    console.error("Error while trying to create subcategory\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
