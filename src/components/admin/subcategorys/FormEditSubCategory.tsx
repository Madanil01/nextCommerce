"use client";
import { useEffect, useState } from "react";
import NotificationComponent from "@/components/NotificationsComponent";
import axios from "axios";
import PaginationComponent from "@/components/PaginationComponent";

interface EditCategoryProps {
  isOpen: boolean;
  onClose: any;
  subcategoryId: string;
}
const FormEditSubCategory = ({
  isOpen,
  onClose,
  subcategoryId,
}: EditCategoryProps) => {
  const [subCategory, setSubCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [categoryOld, setCategoryOld] = useState([]);
  const [categoryOldId, setCategoryOldId] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [category, setCategory] = useState("");

  // if (!isOpen || !subcategoryId) {
  //   return null;
  // }
 const getSubCategory = async () => {
   try {
     const response = await axios.get(`/api/subcategorys/${subcategoryId}`);

     setSubCategory(response.data.data.name);
     setCategoryId(response.data.data.categoryId);
     getCategoryById(response.data.data.categoryId);
   } catch (error: any) {
     console.log(error.message);
   }
 };

 const getCategory = async () => {
   try {
     const response = await axios.get("/api/categorys");
     setCategoryData(response.data.category);
   } catch (e: any) {
     console.log(e.message);
   }
 };
  useEffect(() => {
    getCategory();
    getSubCategory();
  }, []);
   
const getCategoryById = async (param:any) => {
  console.log(param)
      try {
        const response = await axios.get(`/api/categorys/${param}`);
        setCategoryOld(response.data.data.name);
        setCategoryOldId(param);
        console.log(response.data.data._id)
      } catch (e: any) {
        console.log(e.message);
      }
    };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(subcategoryId)
    try {
      const response = await axios.patch(`/api/subcategorys/${subcategoryId}`, {
        name: subCategory,
        categoryId: category || categoryOldId
      });
      setMessage("Data Category berhasil ditambahkan");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Category gagal ditambahkan");
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
        <div className="bg-zinc-950 p-4 rounded-lg shadow-lg z-10 relative w-96">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-white bg-black rounded-lg"
          >
            <CrossSVG />
          </button>
          <div className="flex w-full justify-center mt-6">
            <h1 className="text-xl font-semibold">Form Add Category</h1>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Sub Category
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
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-white"
                >
                  Category Name
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={categoryOldId}>{categoryOld}</option>
                  {categoryData.map((category: any) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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

export default FormEditSubCategory;
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
