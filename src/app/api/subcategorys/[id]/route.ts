import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import SubCategory from "@/models/subCategoryModel"

connect();

//get category by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const subcategoryId = params.id;
try {
    const subcategory = await SubCategory.findOne({ _id: subcategoryId });
    if (subcategory) {
      return NextResponse.json({
        message: "subcategory found",
        status:200,
        data: subcategory,
      });
    } else {
      return NextResponse.json(
        { message: "subcategory not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//update category
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const subcategoryId = params.id;

  try {
    // Assuming the request body contains the updated category data
    const { name, categoryId } = await request.json();

    // Validate that at least one attribute (e.g., name) is present for updating
    if (!name || !categoryId) {
      return NextResponse.json(
        {
          error:
            "At least one attribute (e.g., name) is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the category by ID
    const subcategory = await SubCategory.findOne({ _id: subcategoryId });

    if (subcategory) {
      // Update the category with the provided data
      subcategory.name = name;
      subcategory.categoryId = categoryId;
      // Add more attributes here if needed

      // Save the updated category
      await subcategory.save();

      return NextResponse.json({
        message: "subCategory updated",
        status: 200,
        data: subcategory,
      });
    } else {
      return NextResponse.json(
        { message: "subCategory not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const subcategoryId = params.id;

  try {
    // Find the category by ID
    const subcategory = await SubCategory.findOne({ _id: subcategoryId });

    if (subcategory) {
      // Delete the category
      await subcategory.deleteOne();

      return NextResponse.json({
        message: "SubCategory deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}