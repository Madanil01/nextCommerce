"use client";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { FaAngleDown, FaAngleUp} from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState("nothing");
  const [username, setUserame] = useState("");
  useEffect(() => {
   getUserDetails();
  }, []);
   const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
      setUserame(res.data.data.username);
    };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="">
      <nav className="relative flex flex-wrap items-center justify-between  py-3 bg-zinc-950 mb-3 z-10 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-2xl md:text-3xl font-bold leading-relaxed inline-block mr-4 px-2 py-2 whitespace-nowrap text-white"
              href="#pablo"
            >
              Product&co
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="FaBars"></i>
              <FaBars />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center items-center">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md leading-snug text-white hover:opacity-75"
                  href="/user"
                >
                  {/* <i className="fab fa-facebook-square text-lg leading-lg text-purple-700 opacity-75"></i> */}
                  <span className="ml-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md leading-snug text-white hover:opacity-75"
                  href="/user/products"
                >
                  {/* <i className="fab fa-twitter text-lg leading-lg text-purple-700 opacity-75"></i> */}
                  <span className="ml-2">Product</span>
                </a>
              </li>
               <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md leading-snug text-white hover:opacity-75"
                  href="/user/products"
                >
                  {/* <i className="fab fa-twitter text-lg leading-lg text-purple-700 opacity-75"></i> */}
                  <span className="ml-2">Transaction</span>
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center items-center">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md leading-snug text-white hover:opacity-75"
                  href="/user/products"
                >
                  {/* <i className="fab fa-twitter text-lg leading-lg text-purple-700 opacity-75"></i> */}
                  <FaCartPlus/><span className="ml-2">Cart</span>
                </a>
              </li>
              <li>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="flex items-center px-4 py-2 text-md font-medium bg-blue-400 hover:bg-blue-700 text-white rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
                  >
                    {username} <FaAngleDown className="ml-2" />
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul>
                        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                          {/* <i className="fab fa-pinterest text-lg leading-lg text-purple-700 opacity-75"></i> */}
                          <span className=" text-gray-700 hover:bg-gray-100">
                            Profile
                          </span>
                        </li>
                        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <button type="submit" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    // <div className="bg-black text-white">
    //   <div className="container mx-auto flex justify-between items-center h-14">
    //     <div className="text-xl">Navbar</div>
    //     <div>
    //       {/* <Link legacyBehavior href="/auth/login">
    //         <a className="text-black bg-white py-2 rounded-lg hover:text-gray-300 px-4">
    //           Login
    //         </a>
    //       </Link> */}
    //       {/* <button
    //         onClick={logout}
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //       >
    //         Logout
    //       </button> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
