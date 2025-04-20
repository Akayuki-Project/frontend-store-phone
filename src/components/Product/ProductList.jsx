import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaTag,
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
} from "react-icons/fa";
import { FadeLeft } from "../../utility/animation";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get("https://api-store-phone.vercel.app/api/products");
        setProductList(response.data);
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      }
    };

    fetchProductList();
  }, []);

  const getBadge = (product) => {
    if (product.isNew) return { text: "Produk Terbaru", color: "bg-gradient-to-r from-blue-500 to-violet-500" };
    if (product.sold >= 20)
      return { text: "Produk Terlaris", color: "bg-gradient-to-r from-blue-500 to-violet-500" };
    if (product.price <= 10000000)
      return { text: "Produk Termurah", color: "bg-gradient-to-r from-blue-500 to-violet-500" };
    return null;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = window.innerWidth > 768 ? 400 : 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="ProductList" className="relative max-w-8xl mx-auto py-32 px-4">
      {/* Judul dan tombol kiri-kanan */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Tombol kiri */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-5 bg-gray-300 p-3 rounded-full shadow hover:bg-gray-400 text-xl"
        >
          <FaChevronLeft />
        </button>

        {/* Judul */}
        <h2 className="text-2xl font-bold text-center">Product Store</h2>

        {/* Tombol kanan */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-5 bg-gray-300 p-3 rounded-full shadow hover:bg-gray-400 text-xl"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* List produk */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-1 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      >
        {productList
          .slice()
          .reverse()
          .map((product, index) => {
            console.log("Product:", product); // 🐞 Cek apakah ada _id
            const badge = getBadge(product);
            return (
              <motion.div
                key={product._id}
                variants={FadeLeft(index * 0.1)}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.05 }}
                onClick={() => navigate(`/detail/${product._id}`)}
                className="min-w-[300px] bg-white p-4 rounded-lg shadow-md items-start cursor-pointer"
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-lg"
                />
                {badge && (
                  <div
                    className={`inline-flex items-center gap-2 text-white text-xs px-2 py-1 rounded-full mt-4 ${badge.color}`}
                  >
                    <FaTag />
                    <span>{badge.text}</span>
                  </div>
                )}
                <h3 className="font-semibold text-lg mt-3">{product.name}</h3>
                <p className="text-black font-bold text-md mt-1">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>
                <p className="mt-3 text-indigo-500 text-sm underline">
                  Lihat Selengkapnya
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <FaShoppingCart className="text-blue-500" />
                  <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                    {product.sold || product.sales || 0} terjual
                  </span>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
