"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import AdminLayout from "../../layouts";
import ProductAddForm from "@/components/admin/products/ProductAddForm";

export default function AddProduct() {
  const [imageUrl, setImageUrl] = useState("");

  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = await res.json();

      setImageUrl(data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <AdminLayout>
      <div className="flex w-full justify-center items-center">
        <div className="mt-10 bg-zinc-950 mx-2 md:w-2/4 rounded-lg">
          <div className="p-4 ">
            <h1 className="text-2xl font-semibold text-center">
              Form Add Product
            </h1>
            <ProductAddForm />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
