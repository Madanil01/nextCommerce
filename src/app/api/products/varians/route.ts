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

connect();

//get all data varian
export async function GET(request: NextRequest) {
  try {
    const varian = await Varian.find(); // Mengambil semua produk dari database
    return NextResponse.json({ varian });
  } catch (error) {
    console.error("Error while trying to fetch varian\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
//add data varian
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob | null;
  const size = formData.get("size");
  const color = formData.get("color");
  const productId = formData.get("productId");
  const stock = formData.get("stock");
  const price = formData.get("price");
  console.log(formData);
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
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
  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uuidv4()}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const newVarian = new Varian({
      size: size,
      color: color,
      productId: productId,
      stock: stock,
      price: price,
      image: filename, // Use the unique file name
      url: `${relativeUploadDir}/${filename}`,
    });

    const savedVarian = await newVarian.save();
    console.log(savedVarian);
    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${filename}`,
      message: "Varian created successfully",
    });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
