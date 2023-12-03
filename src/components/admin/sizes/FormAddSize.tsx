import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationComponent from "@/components/NotificationsComponent";

const FormAddSize = () => {
  const [sizeData, setSizeData] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sizes", {
        sizeData: sizeData.toUpperCase()
      });
      setMessage("Data Size berhasil ditambahkan");
      setIsError(false);
    } catch (error: any) {
      setMessage("Data Size gagal ditambahkan");
      setIsError(true);
    }
  };
  return (
    <div className="w-full p-4 bg-zinc-950 text-zinc-100">
      <NotificationComponent message={message} isError={isError} />
      <div className="flex w-full justify-center">
        <h1 className="text-xl font-semibold">Form Add Size</h1>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="sizeData"
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
  );
};

export default FormAddSize;
