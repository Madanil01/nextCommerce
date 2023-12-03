import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";

interface DetailProduct {
  productId: string;
  userId: string;
}

const DetailProductComponent = ({ productId, userId }: DetailProduct) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [varianData, setVarianData] = useState<any>([]);
  const [selectedVarian, setSelectedVarian] = useState("");
  const [jumlahPesanan, setJumlahPesanan] = useState<number>(1);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [variasiStock, setVariasiStock] = useState<number>(0);
  const [selectedVariasiPrice, setSelectedVariasiPrice] = useState<number>(0);
  const [disableAddToCart, setDisableAddToCart] = useState(true);
   const [disableMinus, setDisableMinus] = useState(true);
  const [disablePlus, setDisablePlus] = useState(false);

  useEffect(() => {
    getProductsDetail();
    getVarianByProductId();
  }, []);

  const getProductsDetail = async () => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      const data = response.data.data;
      setName(data.name);
      setPrice(data.price);
      setCategory(data.category);
      setSubCategory(data.subCategory);
      setUrl(data.url);
      setDesc(data.desc);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  const handleVariasiChange = (e: any) => {
    const selectedVariasiId = e.target.value;
    setSelectedVarian(selectedVariasiId);
    if (!selectedVariasiId) {
      setVariasiStock(0);
      setSelectedVariasiPrice(0);
      setDisableAddToCart(true); // Menonaktifkan "Add to Cart" jika opsi kosong ("Select Varian") dipilih
      //setDisableInStorePickup(true);
    } else {
      const selectedVariasi = varianData.find(
        (varian: any) => varian._id === selectedVariasiId
      );

      if (selectedVariasi) {
        setSelectedVariasiPrice(selectedVariasi.price);
        setVariasiStock(selectedVariasi.stock);
        setDisableAddToCart(false);
        if(jumlahPesanan > selectedVariasi.stock){
          setJumlahPesanan(selectedVariasi.stock)
        }
      }
    }
  };
  const getVarianByProductId = async () => {
    try {
      const response = await axios.get(
        `/api/products/varians/productId/${productId}`
      );
      const data = response.data.data;
      setVarianData(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };


  // Validasi jumlah pembelian
  useEffect(() => {
    setDisableMinus(jumlahPesanan <= 1);
    setDisablePlus(jumlahPesanan >= variasiStock);
  }, [jumlahPesanan, variasiStock]);

  const handleMinusClick = () => {
    if (jumlahPesanan > 1) {
      setJumlahPesanan(jumlahPesanan - 1);
    }
  };

  const handlePlusClick = () => {
    if (jumlahPesanan < variasiStock) {
      setJumlahPesanan(jumlahPesanan + 1);
    }
  };

 const handleSubmit = async (e: any) => {
   e.preventDefault();
   try {
     // Cek apakah pesanan dengan status 0 sudah ada
     const existingPesanan = await axios.get(`/api/pesanans/userId/${userId}`);

     if (existingPesanan.data.data.length === 0) {
       console.log(existingPesanan.data.data.length);
     } else {
       existingPesanan.data.data.forEach((order:any) => {
         const statusPesanan = order.statusPesanan;

         if (parseInt(statusPesanan) === 1) {
           console.log("Pesanan Ada status 1:", order);
         } 
       });
     }
   } catch (error: any) {
     console.error("Gagal membuat pesanan:", error);
   }
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
              <div className="text-2xl text-zinc-100 mb-4">
                Category: {category} - {subCategory}
              </div>
              <div className="text-5xl font-semibold text-zinc-100">{name}</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mt-4">
                  <label
                    htmlFor="category"
                    className="text-lg text-zinc-100"
                  >
                    Select Varian
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedVarian}
                    onChange={handleVariasiChange}
                  >
                    <option value="">Select Varian</option>
                    {varianData.map((varian: any) => (
                      <option key={varian._id} value={varian._id}>
                        {varian.size} - {varian.color} - Stock : {varian.stock}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                    <label
                    htmlFor="jumlahPesanan"
                    className="text-lg font-semibold text-zinc-100"
                  >
                    Qty
                  </label>
                <div className="flex c items-center mt-2 px-2">
                  <button
                    className="w-8 h-8 rounded-lg bg-blue-400 hover:bg-blue-500 transition-all ease-in-out duration-300 text-zinc-950"
                    onClick={handleMinusClick}
                    disabled={disableMinus}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="border border-purple-500 rounded p-2 text-md ml-2 mr-2 text-zinc-950"
                    value={jumlahPesanan}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      if (
                        !isNaN(newValue) &&
                        newValue >= 1 &&
                        newValue <= variasiStock
                      ) {
                        setJumlahPesanan(newValue);
                      }
                    }}
                  />
                  <button
                    className="w-8 h-8 rounded-lg bg-blue-400 hover:bg-blue-500 transition-all ease-in-out duration-300 text-zinc-950"
                    onClick={handlePlusClick}
                    disabled={disablePlus}
                  >
                    +
                  </button>
                </div>
                </div>
                <div className="w-full mx-auto flex justify-center">
                  <p className="text-lg px-2 md:text-3xl text-center mt-4 font-semibold border border-blue-500 w-1/2 p-4 rounded-lg">
                  Total Price : Rp. {(jumlahPesanan * selectedVariasiPrice).toLocaleString()}
                  </p>
                </div>
               
                <div className="text-xl mt-10 font-semibold text-zinc-100">
                  Description
                </div>
                <div className="text-lg mt-2 text-gray-400 mb-4">{desc}</div>
                <button
                  type="submit"
                  className="mt-10 bg-blue-500 hover:bg-blue-700 text-zinc-100 p-4 rounded-xl tracking-tighter w-full flex items-center justify-center"
                >
                  <FaCartPlus className="mr-2" />
                  <span className="text-xl">Add to Cart</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductComponent;
