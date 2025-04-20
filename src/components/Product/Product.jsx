import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import { FaTag, FaShoppingCart } from "react-icons/fa";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";
    setSearchTerm(keyword);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(URL_PRODUCT);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    navigate(`/product?search=${encodeURIComponent(keyword)}`);
  };

  const getBadge = (product) => {
    if (product.isNew)
      return {
        text: "Produk Terbaru",
        color: "bg-gradient-to-r from-blue-500 to-violet-500",
      };
    if (product.sold >= 20)
      return {
        text: "Produk Terlaris",
        color: "bg-gradient-to-r from-blue-500 to-violet-500",
      };
    if (product.price <= 10000000)
      return {
        text: "Produk Termurah",
        color: "bg-gradient-to-r from-blue-500 to-violet-500",
      };
    return null;
  };

  return (
    <section className="container flex flex-col min-h-screen mx-auto py-6 px-6 md:px-0 overflow-hidden">
      <div className="mb-4 md:mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full md:w-1/2 p-2 border rounded-xl shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start justify-center py-4 md:py-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const finalPrice = product.price || 0;
            const badge = getBadge(product);

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                onClick={() => navigate(`/detail/${product._id}`)}
                className="bg-white rounded-xl shadow-md flex items-center p-4 gap-4 hover:shadow-lg cursor-pointer"
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  {badge && (
                    <div
                      className={`inline-flex items-center gap-2 text-white text-xs px-2 py-1 rounded-full mt-3 ${badge.color}`}
                    >
                      <FaTag />
                      <span>{badge.text}</span>
                    </div>
                  )}
                  <h2 className="text-lg font-poppins">{product.name}</h2>
                  <p className="font-bold">
                    Rp{finalPrice.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <FaShoppingCart className="text-blue-500" />
                    <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent text-sm">
                      {product.sold || product.sales || 0} terjual
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-gray-600 col-span-3 text-center font-poppins">
            Tidak ada produk ditemukan 😥
          </p>
        )}
      </div>
    </section>
  );
};

export default Product;
