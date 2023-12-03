"use client"
import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts";
import DetailProductComponent from '@/components/user/products/DetailProductComponent';
import axios from "axios";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
    const [userId, setUserId] = useState("nothing");
    const [username, setUserame] = useState("");
    useEffect(() => {
      getUserDetails();
    }, []);
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      setUserId(res.data.data._id);
      setUserame(res.data.data.username);
    };
  return (
      <div>
        <UserLayout>
          <DetailProductComponent productId={params.id} userId={userId} />
        </UserLayout>
    </div>
  )
}

export default ProductDetailPage