import { useState, useEffect } from "react";
import axios from "axios";
import NotificationComponent from "@/components/NotificationsComponent";

const ProductAddForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get("/api/categorys");
        console.log(response.data.category);
        setCategoryData(response.data.category);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    const getSubCategory = async () => {
      try {
        const response = await axios.get("/api/subcategorys");
        console.log(response.data.subcategory);
        setSubCategoryData(response.data.subcategory);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getCategory();
    getSubCategory();
  }, []);

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

  // const handledescChange = (e: any) => {
  //   const inputValue = e.target.value;
  //   if (inputValue.length <= 200) {
  //     setdesc(inputValue);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("desc:", desc);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("desc", desc);
      formData.append("file", file);
      // Add desc to formData
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data berhasil ditambahkan");
      setMessage("Data berhasil ditambahkan");
      setIsError(false);
    } catch (error: any) {
      console.log(error);
      setMessage("Data gagal ditambahkan");
      setIsError(true);
    }
  };

  return (
    <div className="mt-6">
      <NotificationComponent message={message} isError={isError} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Nama Produk
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-white"
          >
            Harga
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
            htmlFor="category"
            className="block text-sm font-medium text-white"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categoryData.map((category: any) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-white"
          >
            Sub Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Select SubCategory</option>
            {subCategoryData.map((subcategory: any) => (
              <option key={subcategory._id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-white"
          >
            Desc (maks 200 character)
          </label>
          <textarea
            id="desc"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            maxLength={200}
          />
          <p className="text-right text-sm text-gray-400">{desc.length}/200</p>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Kirim
        </button>
      </form>
    </div>
  );
};

export default ProductAddForm;
