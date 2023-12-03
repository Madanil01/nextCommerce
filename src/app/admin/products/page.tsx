"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts";
import CardProduct from "@/components/admin/products/CardProduct";
import CarouselComponent from "@/components/admin/products/CarouselComponent";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import PaginationComponent from "@/components/PaginationComponent";

export default function ProductPage(): JSX.Element {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
   const images = [
    "/media/Banner.png", // Ganti dengan path gambar pertama
    "/media/Banner.png", // Ganti dengan path gambar kedua
    "/media/Banner.png", // Ganti dengan path gambar ketiga
  ];
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const response = await axios.get("/api/products");
    setData(response.data.products);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };


  return (
    <AdminLayout>
      <div className="w-full mt-4 mx-2 ">
        <CarouselComponent images={images}/>
      </div>
      <div className="w-max mt-4 mx-2 bg-green-500 hover:bg-green-700 p-4 rounded-lg">
        <a className=" font-semibold flex" href="/admin/products/add">
          <FaPlus className="mr-2 my-auto" />
          Add Product
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full">
      {displayedProducts.map((datas: any) => (
        <div key={datas._id}>
          <CardProduct
            dataKey = {datas._id}
            imgSrc={datas.url}
            imgAlt={datas.name}
            imgSize={300}
            prodCat={datas.category}
            prodTitle={datas.name}
            prodDesc={datas.desc}
            prodPrice={datas.price}
          />
        </div>
      ))}
      </div>
      <div className="mt-10">
         <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /></div>
      
    </AdminLayout>
  );
}
