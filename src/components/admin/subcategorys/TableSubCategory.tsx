"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FormEditCategory from "./FormEditSubCategory";
import NotificationComponent from "@/components/NotificationsComponent";
import PaginationComponent from "@/components/PaginationComponent";

interface TableProps {
  categoryId: string;
}

const TableSubCategory = () => {
  const [dataSubCategory, setDataSubCategory] = useState<any>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getSubCategory = async () => {
    try {
      const response = await axios.get(`/api/subcategorys`);
      const subcategoryData = response.data.subcategory;
      const categoryId = response.data.subcategory.categoryId;
      console.log(subcategoryData)
      // Fetch category data for each subcategory
      const subcategoryWithCategoryData = await Promise.all(
        subcategoryData.map(async (subcategory: any) => {
          const categoryResponse = await axios.get(
            `/api/categorys/${subcategory.categoryId}`
          );
          const categoryData = categoryResponse.data.data;
          console.log(categoryData)
          return {
            ...subcategory,
            categoryName: categoryData.name, // Assuming your category object has a 'name' property
          };
        })
      );

      setDataSubCategory(subcategoryWithCategoryData);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  const deleteData = async (param: any) => {
    try {
      await axios.delete(`/api/categorys/${param}`);
      setMessage("Data Category berhasil dihapus");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Category gagal dihapus");
      setIsError(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedSubCategory = dataSubCategory.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dataSubCategory.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="bg-zinc-950 p-4">
        <NotificationComponent message={message} isError={isError} />
        <div className="flex w-full justify-center">
          <h1 className="text-xl font-semibold">Form Add SubCategory</h1>
        </div>
        <div className="mt-12">
          <table className="min-w-full border-zinc-100">
            <thead>
              <tr>
                <th className="py-2 px-4 border">NO</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">SubCategory</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubCategory.map((subcategory: any, index: any) => (
                <tr key={subcategory._id}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    {subcategory.categoryName}
                  </td>
                  <td className="py-2 px-4 border">{subcategory.name}</td>
                  <td className="py-2 px-4 border flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setSelectedSubCategory(subcategory._id);
                        setPopupOpen(true);
                      }}
                      className="p-2 flex items-center text-md leading-snug bg-blue-500 hover:opacity-75 text-white w-1/3 rounded-lg"
                      style={{ textAlign: "center" }}
                    >
                      <p className="text-center w-full">Edit</p>
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Apakah Anda yakin ingin menghapus Mahasiswa ini?"
                          )
                        ) {
                          deleteData(subcategory._id);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-10">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {isPopupOpen && selectedSubCategory && (
        <FormEditCategory
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          subcategoryId={selectedSubCategory}
        />
      )}
    </div>
  );
};

export default TableSubCategory;
