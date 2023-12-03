import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/dbConfig/dbConfig";
import multer from "multer";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Product from "@/models/productModel";

// Initialize multer with your desired configuration
connect();
const upload = multer({
  dest: "public/media/", // Set the destination directory for file uploads
});
export const config = {
  api: {
    bodyParser: false,
  },
};
//add varian
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob | null;
  const name = formData.get("name");
  const price = formData.get("price");
  const desc = formData.get("desc");
  const category = formData.get("category");
  const subCategory = formData.get("subCategory");
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
    const newProduct = new Product({
      name: name,
      price: price,
      category: category,
      subCategory: subCategory,
      desc: desc,
      image: filename,
      url: `${relativeUploadDir}/${filename}`,
    });
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    return NextResponse.json({ savedProduct });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

//get all data varian
export async function GET(request: NextRequest) {
  try {
    const products = await Product.find(); // Mengambil semua produk dari database
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error while trying to fetch products\n", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
