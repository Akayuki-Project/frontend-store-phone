import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${URL_PRODUCT}/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value);
  };

  const handleBuy = () => {
    navigate(`/checkout/${id}`, {
      state: { quantity },
    });
  };

  if (!product) {
    return <p className="text-center py-20">Memuat detail produk... 🌀</p>;
  }

  const finalPrice = product.price || 0;

  return (
    <div className="max-w-8xl mx-auto px-6 py-8 mt-16 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Kiri: Gambar Produk */}
        <div className="md:col-span-4">
          <Zoom>
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover cursor-zoom-in shadow-md"
            />
          </Zoom>
        </div>

        {/* Tengah: Nama & Deskripsi */}
        <div className="md:col-span-5">
          <h2 className="text-2xl font-poppins">{product.name}</h2>
          <span className="text-gray-500 ml-1">
            {product.sales || 0} Terjual
          </span>
          <p className="text-gray-700 font-semibold mt-4">Kondisi: {product.kondisi}</p>
          <p className="text-gray-700 font-semibold mt-2">Ram: {product.ram} GB</p>
          <p className="text-gray-700 font-semibold mt-2">Rom: {product.rom} GB</p>
          <p className="text-gray-700 font-semibold mt-2">Warna: {product.warna}</p>
          <h3 className="text-2xl font-bold mb-2 mt-4">Deskripsi Produk</h3>
          <p className="text-gray-500">{product.description}</p>
        </div>

        {/* Kanan: Form Pembelian */}
        <div className="md:col-span-3 bg-gray-50 p-6 rounded-lg shadow-inner">
          <p className="font-poppins text-2xl font-bold mb-3">
            Atur jumlah dan catatan
          </p>

          <p className="text-2xl font-bold mb-2">
            Rp{finalPrice.toLocaleString("id-ID")}
          </p>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kuantitas</label>
            <div className="flex items-center border rounded-md w-max">
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-14 text-center border-x outline-none"
                min="1"
                max={product.stock || 1}
              />
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(prev + 1, product.stock || prev + 1)
                  )
                }
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Stok */}
          <p className="text-sm text-gray-500 mb-4">
            Stok: {product.stock ?? 0}
          </p>

          <button
            onClick={handleBuy}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-md transition mb-4"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
