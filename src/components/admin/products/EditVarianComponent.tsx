"use client";
import React, { useEffect, useState } from "react";
import NotificationComponent from "@/components/NotificationsComponent";
import axios from "axios";
import PaginationComponent from "@/components/PaginationComponent";

interface EditCategoryProps {
  isOpen: boolean;
  onClose: any;
  varianId: string;
  productId: string;
}
const FormEditCategory = ({
  isOpen,
  onClose,
  varianId,
  productId
}: EditCategoryProps) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [dataColor, setColorData]= useState<any>([])
  const [dataSize, setSizeData]= useState<any>([])
  const [sizeOld, setSizeOld] = useState("")
  const [colorOld, setColorOld] = useState("")
  const [dataVarianById, setDataVarianById]= useState()
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const getColor = async () => {
    try {
      const response = await axios.get("/api/colors");
      setColorData(response.data.color);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getSize = async () => {
    try {
      const response = await axios.get(`/api/products/varians/${varianId}`);
      setDataVarianById(response.data.data);
      setSize(response.data.data.size);
      setColor(response.data.data.color);
      setStock(response.data.data.stock)
      setPrice(response.data.data.price);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getVarianById = async()=>{
    try{
      const response = await axios.get(`/api/sizes`);
      setSizeData(response.data.size);
    }catch(error:any){

    }
  }

 
 const loadImage = async (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
    setPreview(URL.createObjectURL(file));

    if (!file) {
      console.warn("No file was chosen");
      return;
    }
    if (!file || file.length === 0) {
      console.warn("Files list is empty");
      return;
    }
  };
  useEffect(() => {
    getVarianById()
    getColor()
    getSize()
  },[])
  const handleSubmit = async (e: any) => {
   e.preventDefault();
   try {
     const formData = new FormData();
     formData.append("size", size);
     formData.append("color", color);
     formData.append("stock", stock);
     formData.append("productId", productId);
     formData.append("price", price);
     formData.append("file", file);
     // Add desc to formData
     const response = await axios.patch(`/api/products/varians/${varianId}`, formData, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     });
     setMessage("Data Varian berhasil ditambahkan");
     setIsError(false);
   } catch (error: any) {
     console.log(error);
     setMessage("Data Varian Gagal ditambahkan");
     setIsError(true);
   }
 };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <NotificationComponent message={message} isError={isError} />
        <div
          className="bg-black bg-opacity-50 absolute inset-0"
          onClick={onClose}
        ></div>
        <div className="bg-zinc-950 p-4 rounded-lg shadow-lg z-10 relative w-full md:w-1/2 lg:w-1/3">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-white bg-black rounded-lg"
          >
            <CrossSVG />
          </button>
          <div className="flex w-full justify-center mt-6">
            <h1 className="text-xl font-semibold">Form Edit Category</h1>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-white"
                >
                  Size
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value={size}>{size}</option>
                  {dataSize.map((size: any) => (
                    <option key={size._id} value={size.sizeData}>
                      {size.sizeData}
                    </option>
                  ))}
                </select>
              </div>
             <div>
                <label
                  htmlFor="Color"
                  className="block text-sm font-medium text-white"
                >
                  Color
                </label>
               <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value={color}>{color}</option>
                    {dataColor.map((color:any) => (
                      <option key={color._id} value={color.name}>
                        {color.name} - {color.code}
                      </option>
                    ))}
                  </select>
              </div>
              <div>
                <label
                  htmlFor="Stock"
                  className="block text-sm font-medium text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-white"
                >
                  Gambar Produk
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={loadImage}
                  className="mt-1 p-2 w-full border rounded-md text-white"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditCategory;
const CrossSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};
