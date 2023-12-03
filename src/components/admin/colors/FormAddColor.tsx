import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationComponent from "@/components/NotificationsComponent";

const FormAddColor = () => {
  const [name, setName] = useState("")
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: any) => {
     e.preventDefault();
      try{
        const response = await axios.post("/api/colors", {
          name: name.toUpperCase(),
          code: code,
        });
      setMessage("Data Color berhasil ditambahkan");
      setIsError(false)
    }catch(error:any){
      setMessage("Data Color gagal ditambahkan");
      setIsError(true);
    }
  }
  return (
    <div className="w-full p-4 bg-zinc-950 text-zinc-100">
      <NotificationComponent message={message} isError={isError} />
      <div className="flex w-full justify-center">
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
  );
}

export default FormAddColor