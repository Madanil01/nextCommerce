import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import multer from "multer";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Varian from "@/models/varianModel";
import fs from "fs";

//get varian by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const variansId = params.id;
  //return NextResponse.json({ id }); // 'a', 'b', or 'c'
  try {
    const varians = await Varian.findOne({ _id: variansId });
    if (varians) {
      return NextResponse.json({
        message: "varians found",
        data: varians,
      });
    } else {
      return NextResponse.json(
        { message: "varians not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//update varian by id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const variansId = params.id;
  const formData = await request.formData();

  try {
    const varian = await Varian.findOne({ _id: variansId });

    if (!varian) {
      return NextResponse.json(
        { message: "Varian not found" },
        { status: 404 }
      );
    }

    // Update the varian properties
    if (formData.has("size")) {
      varian.size = formData.get("size");
    }
    if (formData.has("color")) {
      varian.color = formData.get("color");
    }
    if (formData.has("stock")) {
      varian.stock = formData.get("stock");
    }
    if (formData.has("price")) {
      varian.price = formData.get("price");
    }

    if (formData.has("file")) {
      const file = formData.get("file") as Blob | null;
      if (file) {
        // Handle the new image upload
        const buffer = Buffer.from(await file.arrayBuffer());
        const relativeUploadDir = `/uploads/${dateFn.format(
          Date.now(),
          "dd-MM-Y"
        )}`;
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        try {
          await stat(uploadDir);
        } catch (e: any) {
          if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
          } else {
            console.error(
              "Error while trying to create directory when uploading a file\n",
              e
            );
            return NextResponse.json(
              { error: "Something went wrong." },
              { status: 500 }
            );
          }
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${uuidv4()}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);

        // Remove the old image file and update the varian with the new image and URL
        if (varian.image) {
          const oldImageFilePath = join(uploadDir, varian.image);
          if (fs.existsSync(oldImageFilePath)) {
            fs.unlinkSync(oldImageFilePath);
          }
        }
        varian.image = filename;
        varian.url = `${relativeUploadDir}/${filename}`;
      // } else {
      //   return NextResponse.json(
      //     { error: "File blob is required." },
      //     { status: 400 }
      //   );
      }
    }

    // Save the updated varian
    const updatedVarian = await varian.save();

    return NextResponse.json({
      message: "Varian updated successfully",
      data: updatedVarian,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete varian by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const variansId = params.id;

  try {
    const varian = await Varian.findOne({ _id: variansId });

    if (!varian) {
      return NextResponse.json(
        { message: "Varian not found" },
        { status: 404 }
      );
    }

    // Hapus file gambar jika ada
    if (varian.image) {
      const uploadDir = join(process.cwd(), "public", varian.url);

      if (fs.existsSync(uploadDir)) {
        fs.unlinkSync(uploadDir);
      }
    }

    // Hapus varian dari database menggunakan deleteOne
    await Varian.deleteOne({ _id: variansId });

    return NextResponse.json({
      message: "Varian deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
