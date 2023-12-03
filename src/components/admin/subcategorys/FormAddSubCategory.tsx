import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationComponent from "@/components/NotificationsComponent";

const FormAddSubCategory = () => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [subCategory, setSubCategory] = useState("");
  const getCategory = async () => {
    try {
      const response = await axios.get(`/api/categorys`);
      setDataCategory(response.data.category);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const handleSubmit = async (e: any) => {
    console.log(categoryId)
     e.preventDefault();
      try{
        const response = await axios.post("/api/subcategorys", {
        name:subCategory,
        categoryId:categoryId
      })
      setMessage("Data Category berhasil ditambahkan");
      setIsError(false)
      } catch (error: any) {
        console.log(error.message)
      setMessage("Data Category gagal ditambahkan");
      setIsError(true);
    }
  }
  return (
    <div className="w-full p-4 bg-zinc-950 text-zinc-100">
      <NotificationComponent message={message} isError={isError} />
      <div className="flex w-full justify-center">
        <h1 className="text-xl font-semibold">Form Add SubCategory</h1>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white"
            >
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {dataCategory.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-white"
            >
              SubCategory
            </label>
            <input
              type="text"
              id="subCategory"
              name="subCategory"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
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
  );
}

export default FormAddSubCategory