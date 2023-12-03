"use client";
import React, { useEffect, useState } from "react";
import NotificationComponent from "@/components/NotificationsComponent";
import axios from "axios";
import PaginationComponent from "@/components/PaginationComponent";

interface EditSizeProps {
  isOpen: boolean;
  onClose: any;
  sizeId: string;
}
const FormEditSize = ({
  isOpen,
  onClose,
  sizeId,
}: EditSizeProps) => {
  const [sizeData, setSizeData] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // if (!isOpen || !categoryId) {
  //   return null;
  // }
  const getSize = async () => {
    try {
      const response = await axios.get(`/api/sizes/${sizeId}`);
      setSizeData(response.data.data.sizeData);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSize();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/sizes/${sizeId}`, {
        sizeData: sizeData,
      });
      setMessage("Data size berhasil diupdate");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data size gagal diupdate");
      setIsError(true);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <NotificationComponent message={message} isError={false} />
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
                  Size
                </label>
                <input
                  type="text"
                  id="sizeData"
                  name="sizeData"
                  value={sizeData}
                  onChange={(e) => setSizeData(e.target.value)}
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
      </div>
    </div>
  );
};

export default FormEditSize;
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
