import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel"

connect();

//get category by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const categoryId = params.id;
try {
    const category = await Category.findOne({ _id: categoryId });
    if (category) {
      return NextResponse.json({
        message: "category found",
        status:200,
        data: category,
      });
    } else {
      return NextResponse.json(
        { message: "category not found" },
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
  const categoryId = params.id;

  try {
    // Assuming the request body contains the updated category data
    const { name } = await request.json();

    // Validate that at least one attribute (e.g., name) is present for updating
    if (!name) {
      return NextResponse.json(
        {
          error:
            "At least one attribute (e.g., name) is required for updating.",
        },
        { status: 400 }
      );
    }

    // Find the category by ID
    const category = await Category.findOne({ _id: categoryId });

    if (category) {
      // Update the category with the provided data
      category.name = name;
      // Add more attributes here if needed

      // Save the updated category
      await category.save();

      return NextResponse.json({
        message: "Category updated",
        status: 200,
        data: category,
      });
    } else {
      return NextResponse.json(
        { message: "Category not found" },
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
  const categoryId = params.id;

  try {
    // Find the category by ID
    const category = await Category.findOne({ _id: categoryId });

    if (category) {
      // Delete the category
      await category.deleteOne();

      return NextResponse.json({
        message: "Category deleted",
        status: 200,
      });
    } else {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}