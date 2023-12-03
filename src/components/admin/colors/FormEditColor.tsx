"use client";
import React, { useEffect, useState } from "react";
import NotificationComponent from "@/components/NotificationsComponent";
import axios from "axios";
import PaginationComponent from "@/components/PaginationComponent";

interface EditColorProps {
  isOpen: boolean;
  onClose: any;
  colorId: string;
}
const FormEditColor = ({ isOpen, onClose, colorId }: EditColorProps) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // if (!isOpen || !categoryId) {
  //   return null;
  // }
  const getColor= async () => {
    try {
      const response = await axios.get(`/api/colors/${colorId}`);
      setName(response.data.data.name);
      setCode(response.data.data.code);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getColor();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/colors/${colorId}`, {
        name: name.toUpperCase(),
        code: code
      });
      setMessage("Data Color berhasil ditambahkan");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Color gagal ditambahkan");
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
            <h1 className="text-xl font-semibold">Form Add Colors</h1>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
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
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Color
                </label>
                <input
                  type="color"
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
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

export default FormEditColor;
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
