import { useEffect, useState } from "react";
import axios from "axios";
import NotificationComponent from "@/components/NotificationsComponent";

interface EditProduct {
  dataKey: string;
}
const ProductEditForm = ({dataKey}:EditProduct) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
   const [subCategory, setSubCategory] = useState("");
   const [categoryData, setCategoryData] = useState([]);
   const [subCategoryData, setSubCategoryData] = useState([]);
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [preview, setPreview] = useState("");
    useEffect(() => {
      getProductsDetail();
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
    const getProductsDetail = async () => {
      const reasponse = await axios.get(`/api/products/${dataKey}`);
      const data = reasponse.data.data;
      setName(data.name);
      setPrice(data.price);
      setCategory(data.category);
      setSubCategory(data.subCategory);
      setUrl(data.url);
      setDesc(data.desc);
    };

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
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("desc", desc);
      formData.append("file", file);
      // Add desc to formData
      const response = await axios.patch(`/api/products/${dataKey}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Data berhasil diupdate");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Gagal diupdate");
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
            <option value={category}>{category}</option>
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
            <option value={subCategory}>{subCategory}</option>
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
            Preview old image
          </label>
          <div className="max-w-[200px] lg:min-h-[200px] flex justify-center items-center">
            <img className="md:rounded-l-xl w-full " src={url} alt="product" />
          </div>
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

export default ProductEditForm;
