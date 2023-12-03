import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";

interface DetailProduct {
    dataKey:string,
}
const DetailComponent = ({dataKey}:DetailProduct) => { 
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [categoryId, setCategoryId] = useState("");
    const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

    useEffect(() => {
    getProductsDetail();
    }, []);
    const getProductsDetail= async () => {
    const reasponse = await axios.get(`/api/products/${dataKey}`);
    const data = reasponse.data.data;
    setName(data.name)
    setPrice(data.price)
    setCategoryId(data.categoryId)
    setUrl(data.url)
    setDesc(data.desc)
    };
    
    return (
      <div>
        <div className="w-full bg-zinc-950 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="max-w-[700px] lg:min-h-[600px] flex justify-center items-center">
              <img className="md:rounded-l-xl w-full " src={url} alt="product" />
            </div>
            <div className="h-full w-full flex items-center">
              <div>
                <div className="text-2xl text-zinc-100">Category: {categoryId}</div>
                <div className="text-5xl font-semibold text-zinc-100">{name}</div>
                <div className="text-2xl mt-10 text-zinc-100">Selected Varian</div>
                <div className="text-xl mt-10 font-semibold text-zinc-100">Description</div>
                <div className="text-lg mt-2 text-gray-400">
                  {desc}
                </div>
                <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-zinc-100 p-4 rounded-xl tracking-tighter w-full flex items-center justify-center">
                  <FaCartPlus className="mr-2" />
                  <span className="text-xl">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default DetailComponent;