import { FaBars, FaCartPlus } from "react-icons/fa";
interface ProductCardProps {
  productId: string;
  imgSrc: string;
  imgAlt: string;
  imgSize: number;
  prodCat: number;
  prodTitle: string;
  prodDesc: string;
  prodPrice: number;
}

export default function ProductCard({
  productId,
  imgSrc,
  imgAlt,
  imgSize,
  prodCat,
  prodTitle,
  prodDesc,
  prodPrice,
}: ProductCardProps) {
  const maxDescLength = 50;
  const truncatedDesc =
    prodDesc.length > maxDescLength
      ? prodDesc.slice(0, maxDescLength) + "..." // Add ellipsis if the description is longer
      : prodDesc;
  return (
    <>
      <section>
        <div className="md:wrapper inline-block m-2 xl:flex mxl:flex-row bg-zinc-950 rounded-xl shadow-lg shadow-grey">
          <div className="img-container w-full xl:w-3/6 flex justify-center items-center">
            <img
              className="md:rounded-l-xl"
              src={imgSrc}
              alt={imgAlt}
              width={imgSize}
              height={imgSize}
            />
          </div>

          <div className="product-info md:w-3/6 md:flex md:flex-col justify-between p-7">
            <p className="mb-2 md:mb-0 uppercase text-xs tracking-widest text-white">
              {prodCat}
            </p>
            <h1 className="mb-2 md:mb-0 capitalize text-3xl font-bold leading-7 text-white">
              {prodTitle}
            </h1>
            <p className="text-white">{truncatedDesc}</p>

            <div className="my-2 md:my-0 price-box flex flex-row py-3 items-center">
              <p className="price text-3xl text-green-500 font-bold mr-5 tracking-tighter">
                ${prodPrice}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <a href={`/user/products/${productId}`} className="bg-blue-500 hover:bg-blue-700 text-white p-2.5 rounded-xl tracking-tighter w-full flex items-center justify-center">
                <FaCartPlus className="mr-2" />
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
