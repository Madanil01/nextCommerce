"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FormEditSize from "./FormEditSize";
import NotificationComponent from "@/components/NotificationsComponent";
import PaginationComponent from "@/components/PaginationComponent";

interface TableProps {
  sizeId: string;
}
const TableSize= () => {
  const [dataSize, setDataSize] = useState<any>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getSize = async () => {
    try {
      const response = await axios.get(`/api/sizes`);
      setDataSize(response.data.size);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getSize();
  }, []);
  const deleteData = async (param: any) => {
    try {
      await axios.delete(`/api/sizes/${param}`);
      setMessage("Data Category berhasil dihapus");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Category gagal dihapus");
      setIsError(false);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedSize= dataSize.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dataSize.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="bg-zinc-950 p-4">
        <NotificationComponent message={message} isError={isError} />
        <div className="flex w-full justify-center">
          <h1 className="text-xl font-semibold">Form Add Size</h1>
        </div>
        <div className="mt-12">
          <table className="min-w-full border-zinc-100">
            <thead>
              <tr>
                <th className="py-2 px-4 border">NO</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedSize.map((size: any, index: any) => (
                <tr key={size._id}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{size.sizeData}</td>
                  <td className="py-2 px-4 border flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setSelectedSize(size._id);
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
                          deleteData(size._id);
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
      {isPopupOpen && selectedSize && (
        <FormEditSize
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          sizeId={selectedSize}
        />
      )}
    </div>
  );
};

export default TableSize;
