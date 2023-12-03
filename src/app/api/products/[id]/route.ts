import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import fs from "fs";
import { join } from "path";
import axios from "axios";
import mime from "mime";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { v4 as uuidv4 } from "uuid";

//get product by id
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

//update product by id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  const formData = await request.formData();
  const { name, price, desc, categoryId } = Object.fromEntries(formData);

  try {
    // Temukan produk berdasarkan ID
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found for the provided ID" },
        { status: 404 }
      );
    }

    // Jika ada perubahan, update produk
    if (formData.has("name")) {
      product.name = formData.get("name");
    }
    if (formData.has("price")) {
      product.price = formData.get("price");
    }
    if (formData.has("desc")) {
      product.desc = formData.get("desc");
    }
    if (formData.has("category")) {
      product.category = formData.get("category");
    }
     if (formData.has("subCategory")) {
      product.subCategory = formData.get("subCategory");
    }

    if (formData.has("file")) {
      const file = formData.get("file") as Blob | null;

      if (file) {
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

        if (product.image) {
          const oldImageFilePath = join(uploadDir, product.image);
          if (fs.existsSync(oldImageFilePath)) {
            fs.unlinkSync(oldImageFilePath);
          }
        }

        product.image = filename;
        product.url = `${relativeUploadDir}/${filename}`;
      }
    }

    // Simpan perubahan
    const updatedProduct = await product.save();

    return NextResponse.json({
      message: "Product updated successfully",
      updatedProduct: updatedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//delete product by id dan delete varian product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 404 }
      );
    }

    // Hapus file gambar jika ada
    if (product.image) {
      const getVarian = await axios.get(
        `http://localhost:3000/api/products/varians/productId/${productId}`
      );
      if (getVarian.data.length >= 0) {
        const deleteVarian = await axios.delete(
          `http://localhost:3000/api/products/varians/productId/${productId}`
        );
      }
      const uploadDir = join(process.cwd(), "public", product.url);

      if (fs.existsSync(uploadDir)) {
        fs.unlinkSync(uploadDir);
      }
    }

    // Hapus product dari database menggunakan deleteOne
    await product.deleteOne({ _id: productId });

    return NextResponse.json({
      message: "product deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
