"use client";
import AdminLayout from "../../layouts";
import { useEffect } from "react";
import axios from "axios";
import DetailComponent from "@/components/admin/products/DetailComponent";
import AddVarianComponent from "@/components/admin/products/AddVarianComponent";
import TableProductVarian from "@/components/admin/products/TableProductVarian";
export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <AdminLayout>
      <DetailComponent dataKey={params.id} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
          <AddVarianComponent productId={params.id} />
      <TableProductVarian productId={params.id}/>
      </div>
      
    </AdminLayout>
  );
}
