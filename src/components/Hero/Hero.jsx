import React from "react";
import HeroPng from "../../assets/iphone.png"; // Gambar iPhone sesuai gambar Papa
import { motion } from "framer-motion";
import { FadeRight, FadeLeft } from "../../utility/animation";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-[#f3f3f3] min-h-screen flex items-center justify-center px-6 md:px-20 py-20 md:py-32 lg:py-24"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[450px] relative">
        {/* Gambar di kiri */}
        <div className="flex justify-center items-center order-1 md:order-none">
          <motion.img
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            src={HeroPng}
            alt="iPhone"
            className="w-[300px] md:w-[500px] drop-shadow-xl"
          />
        </div>

        {/* Teks di kanan */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
          <div className="text-center md:text-left space-y-6 lg:max-w-[450px]">
            <motion.h1
              variants={FadeLeft(0.3)}
              initial="hidden"
              animate="visible"
              className="text-4xl lg:text-5xl font-bold text-black"
            >
              Toko HP Paling Murah!
            </motion.h1>
            <motion.p
              variants={FadeLeft(0.6)}
              initial="hidden"
              animate="visible"
              className="text-blue-600 font-semibold text-2xl"
            >
              Produk Second Berkualitas
            </motion.p>
            <motion.p
              variants={FadeLeft(0.9)}
              initial="hidden"
              animate="visible"
              className="text-gray-700 text-base lg:text-lg"
            >
              Menyediakan berbagai macam Handphone kualitas terbaik, dengan
              harga terjangkau
            </motion.p>
            <motion.div
              variants={FadeLeft(1.2)}
              initial="hidden"
              animate="visible"
              className="flex justify-center md:justify-start"
            >
              <button
                onClick={() => {
                  document
                    .getElementById("ProductList")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="primary-btn bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-white font-semibold shadow-md transition duration-300 hover:brightness-110"
              >
                Lihat Produk
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
