import { NextRequest, NextResponse } from "next/server";
import Varian from "@/models/varianModel";
import fs from "fs";
import { join } from "path";

//get varian berdasarkan productId
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId= params.id;
  //return NextResponse.json({ id }); // 'a', 'b', or 'c'
  try {
    const varians = await Varian.find({ productId: productId});
    if (varians) {
      return NextResponse.json({
        message: "varians by productId found",
        data: varians,
      });
    } else {
      return NextResponse.json(
        { message: "varians by productId not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
//delete varians berdasarka productId
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  try {
    // Temukan semua varian berdasarkan productId
    const varianList = await Varian.find({ productId: productId });

    if (varianList.length === 0) {
      return NextResponse.json(
        { message: "No varian found for the provided productId" },
        { status: 404 }
      );
    }

    // Mengumpulkan ID dari semua varian yang akan dihapus
    const varianIds = varianList.map((varian) => varian._id);

    // Hapus file gambar jika ada
    for (const varian of varianList) {
      if (varian.image) {
        const uploadDir = join(process.cwd(), "public", varian.url);

        if (fs.existsSync(uploadDir)) {
          fs.unlinkSync(uploadDir);
        }
      }
    }

    // Hapus semua varian berdasarkan ID menggunakan deleteMany
    await Varian.deleteMany({ _id: { $in: varianIds } });

    return NextResponse.json({
      message: "All varian by productId deleted successfully",
      deletedCount: varianList.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
