import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationComponent from "@/components/PaginationComponent";
import NotificationComponent from "@/components/NotificationsComponent";
import EditVarianComponent from "./EditVarianComponent"

interface VarianTabelProps {
  productId: string;
}

const TableProductVarian = ({ productId }: VarianTabelProps) => {
  const [dataVarian, setDataVarian] = useState<any>([]);
  const [varianId, setVarianId] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isPopupOpen, setPopupOpen] = useState(false);
   const [message, setMessage] = useState("");
   const [isError, setIsError] = useState(false);

  useEffect(() => {
    getDataVarian();
  }, []);

  // get data varian by productId
  const getDataVarian = async () => {
    try {
      const response = await axios.get(
        `/api/products/varians/productId/${productId}`
      );
      console.log(response.data.data);
      setDataVarian(response.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedVarian = dataVarian.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dataVarian.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const deleteData = async (param: any) => {
    try {
      await axios.delete(`/api/products/varians/${param}`);
      setMessage("Data Category berhasil dihapus");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Category gagal dihapus");
      setIsError(false);
    }
  };

  return (
    <div>
      <div className="w-full bg-zinc-950 mt-10 p-4">
        <NotificationComponent message={message} isError={isError} />
        <h1 className="flex justify-center text-xl font-semibold">
          Tabel Varian
        </h1>
        <div className="mt-10">
          <table className="min-w-full  bg-zinc-950 border border-zinc-50">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Size</th>
                <th className="py-2 px-4 border">Color</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedVarian.map((varian: any) => (
                <tr key={varian._id} className="border-b">
                  <td className="py-2 px-4 border">{varian.size}</td>
                  <td className="py-2 px-4 border">{varian.color}</td>
                  <td className="py-2 px-4 border">{varian.stock}</td>
                  <td className="py-2 px-4 border">{varian.price}</td>
                  <td className="py-2 px-4 border">
                    <div className="img-container w-full flex justify-center items-center">
                      <img
                        className="md:rounded-l-xl"
                        src={varian.url}
                        alt="varian"
                        width={100}
                        height={100}
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4 flex gap-2 justify-center items-center">
                    <button
                      onClick={() => {
                        setVarianId(varian._id);
                        setPopupOpen(true);
                      }}
                      className="p-2 flex items-center text-md leading-snug bg-blue-500 hover:opacity-75 text-zinc-50 w-1/3 rounded-lg"
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
                          deleteData(varian._id);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-700 text-zinc-50 p-2 rounded-lg"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isPopupOpen && varianId && (
        <EditVarianComponent
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          varianId={varianId}
          productId={productId}
        />
      )}
    </div>
  );
};

export default TableProductVarian;
