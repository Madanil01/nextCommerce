"use client";
import AdminLayout from "../../../layouts";
import { useEffect } from "react";
import axios from "axios";
import ProductEditForm from "@/components/admin/products/ProductEditForm";

//import DetailComponent from "@/components/admin/products/DetailComponent";
export default function Page({ params }: { params: { id: string } }) {
    console.log(params.id);
  return (
    <AdminLayout>
      {/* <DetailComponent dataKey={params.id} /> */}
      <div className="flex w-full justify-center items-center">
        <div className="mt-10 bg-zinc-950 mx-2 md:w-2/4 rounded-lg">
          <div className="p-4 ">
            <h1 className="text-2xl font-semibold text-center">
              Form Edit Product
            </h1>
            <ProductEditForm dataKey={params.id}/>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
