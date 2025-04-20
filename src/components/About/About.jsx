import React from "react";
import AboutPng from "../../assets/about.png";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-gray-100 text-primary py-32 md:py-40 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-center lg:text-left"
        >
          <h2 className="text-4xl font-bold mb-6">Tentang Kami</h2>
          <p className="text-lg mb-6">
            Selamat datang di <span className="font-semibold">storePHONE</span>,
            tempat terbaik untuk menemukan perangkat dan aksesoris handphone
            yang kamu butuhkan! Kami hadir untuk memberikan solusi terbaik bagi
            kebutuhan teknologi mobile kamu.
          </p>
          <p className="text-lg mb-6">
            Dari charger, earphone, casing, hingga smartphone terbaru, semuanya
            tersedia di sini. Dengan pelayanan yang cepat dan ramah, kami siap
            menjadi partner terbaikmu!
          </p>
          <p className="text-lg flex items-center gap-3">
            📱 Yuk, jelajahi produk kami dan temukan perangkat impianmu sekarang
            juga!
          </p>
        </motion.div>

        {/* Gambar Tunggal */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-[360px] lg:max-w-lg"
        >
          <div className="overflow-hidden w-full rounded-xl shadow-lg border border-white/10">
            <img
              src={AboutPng}
              alt="Tentang Kami"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
