"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import UserLayout from './layouts';
import CarouselComponent from "@/components/user/CarouselComponent";

export default function HomeUser() {
  const images = [
    "/media/Banner.png", // Ganti dengan path gambar pertama
    "/media/Banner.png", // Ganti dengan path gambar kedua
    "/media/Banner.png", // Ganti dengan path gambar ketiga
  ];
  return (
    <UserLayout>
       <div className="w-full mt-4 mx-2">
        <CarouselComponent images={images}/>
      </div>
    </UserLayout>
  
  );
}
