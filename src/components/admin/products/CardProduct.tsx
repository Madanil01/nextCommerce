import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import PaginationComponent from "./../../PaginationComponent";
import NotificationComponent from "@/components/NotificationsComponent";

interface ProductCardProps {
  dataKey: string;
  imgSrc: string;
  imgAlt: string;
  imgSize: number;
  prodCat: number;
  prodTitle: string;
  prodDesc: string;
  prodPrice: number;
}

export default function ProductCard({
  dataKey,
  imgSrc,
  imgAlt,
  imgSize,
  prodCat,
  prodTitle,
  prodDesc,
  prodPrice,
}: ProductCardProps) {
const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // Truncate prodDesc to display only the first 50 characters
  const maxDescLength = 50;
  const truncatedDesc =
    prodDesc.length > maxDescLength
      ? prodDesc.slice(0, maxDescLength) + "..." // Add ellipsis if the description is longer
      : prodDesc;

  const deleteProduct = async (dataKey: string) => {
    try {
      await axios.delete(`/api/products/${dataKey}`);
      setMessage("Data berhasil dihapus");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Gagal dihapus");
      setIsError(true);
    }
  };

  return (
    <>
      <section className="bg-zinc-950 rounded-xl">
        <NotificationComponent message={message} isError={false} />
        <div className="md:wrapper inline-block m-2 xl:flex mxl:flex-row bg-zinc-950 rounded-xl shadow-lg shadow-grey lg:min-h-[450px] lg:max-h-[450px]">
          <div className="img-container w-full xl:w-3/6 flex justify-center items-center">
            <img
              className="md:rounded-l-xl"
              src={imgSrc}
              alt={imgAlt}
              width={imgSize}
              height={imgSize}
            />
          </div>

          <div className="product-info md:w-3/6 md:flex md:flex-col justify-between p-7">
            <p className="mb-2 md:mb-0 uppercase text-xs tracking-widest text-white">
              {prodCat}
            </p>
            <h1 className="mb-2 md:mb-0 capitalize text-xl font-bold leading-7 text-white">
              {prodTitle}
            </h1>
            <p className="text-white">{truncatedDesc}</p>

            <div className="my-2 md:my-0 price-box flex flex-row py-3 items-center">
              <p className="price text-2xl text-green-500 font-bold mr-5 tracking-tighter">
                ${prodPrice.toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 mb-2">
              <Link
                href={`/admin/products/${dataKey}`}
                className="flex justify-center bg-green-500 hover:bg-green-700 text-white p-2.5 rounded-lg tracking-tighter w-full text-center"
              >
                Detail
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`/admin/products/edit/${dataKey}`}
                className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white p-2.5 rounded-lg tracking-tighter w-full"
              >
                Edit
              </a>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Apakah Anda yakin ingin menghapus Mahasiswa ini?"
                    )
                  ) {
                    deleteProduct(dataKey);
                  }
                }}
                className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
          
        </div>
        
      </section>
    </>
  );
}
