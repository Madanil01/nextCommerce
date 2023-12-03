import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  //return NextResponse.json({ id }); // 'a', 'b', or 'c'
  try {
    const product = await Product.findOne({ _id: productId });
    if (product) {
      return NextResponse.json({
        message: "Product found",
        data: product,
      });
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
