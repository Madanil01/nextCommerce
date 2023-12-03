"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserLayout from "../layouts";
import CardProduct from "@/components/user/products/CardProduct";
import CarouselComponent from "@/components/user/CarouselComponent";
import axios from "axios";

export default function ProductPage(): JSX.Element {
  const [data, setData] = useState<any>([]);
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

  return (
    <UserLayout>
      <div className="w-full mt-4 mx-2 bg-white" >
        <CarouselComponent images={images}/>
      </div>
      <div className="flex w-full mt-4 mb-2 mx-2 bg-zinc-950 rounded-lg justify-center"><div className="py-4 text-2xl font-semibold">Product List</div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
      {data.map((datas: any) => (
        <div key={datas._id}>
          <CardProduct
            productId={datas._id}
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
      
    </UserLayout>
  );
}
