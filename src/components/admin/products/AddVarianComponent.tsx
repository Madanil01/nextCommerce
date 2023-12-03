import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NotificationComponent from "@/components/NotificationsComponent";

interface VarianProductProps {
  productId: string;
}
const AddVarianComponent = ({ productId }: VarianProductProps) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [dataColor, setColorData]= useState<any>([])
  const [dataSize, setSizeData]= useState<any>([])
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [preview, setPreview] = useState("");

  const getColor= async ()=>{
    try{
      const response =  await axios.get("/api/colors")
      setColorData(response.data.color)
    }catch(error:any){
      console.log(error.message);
    }
  }
  const getSize= async ()=>{
    try{
      const response =  await axios.get("/api/sizes")
      setSizeData(response.data.size)
    }catch(error:any){
      console.log(error.message);
    }
  }
  useEffect(() => {
    getColor()
    getSize()
  },[])
  
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("size", size);
      formData.append("color", color);
      formData.append("stock", stock);
      formData.append("productId", productId)
      formData.append("price", price);
      formData.append("file", file);
      // Add desc to formData
      const response = await axios.post("/api/products/varians", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Data Varian berhasil ditambahkan");
      setIsError(false)
    } catch (error: any) {
      console.log(error);
      setMessage("Data Varian Gagal ditambahkan");
      setIsError(true)
    }
  };
  return (
    <div>
      <div className="">
        <div className="w-full bg-zinc-950 mt-10 p-4">
          <NotificationComponent message={message} isError={isError} />
          <h1 className="flex justify-center text-xl font-semibold">
            Form Tambah Varian
          </h1>
          <div className="mt-4">
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
                    <option value="">Select Size</option>
                    {dataSize.map((size:any) => (
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
                    <option value="">Select Color</option>
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
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVarianComponent;
