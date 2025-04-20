import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [messageError, setMessageError] = useState("");

  const namePattern = /^[A-Za-z\s]*$/;
  const messagePattern = /^[A-Za-z0-9\s!?.,;:()[\]{}'"\/\\]*$/;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!namePattern.test(value)) {
      setNameError("Nama hanya boleh huruf dan spasi.");
    } else {
      setNameError("");
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    const character = value.trim().length;
    if (character > 1000) {
      setMessageError("Pesan tidak boleh lebih dari 1000 karakter.");
    } else if (!messagePattern.test(value)) {
      setMessageError("Pesan hanya boleh huruf, angka, dan simbol sederhana.");
    } else {
      setMessageError("");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (nameError || messageError) {
      alert("Tolong perbaiki input sebelum mengirim.");
      return;
    }

    emailjs
      .sendForm(
        "service_nmvq8sk",
        "template_mve6zpd",
        e.target,
        "7uhfJmqkBiB4uqZ5z"
      )
      .then(
        () => {
          alert("Pesan berhasil dikirim!");
          e.target.reset();
          setName("");
          setMessage("");
        },
        (error) => {
          alert("Gagal mengirim pesan.");
          console.log(error.text);
        }
      );
  };

  return (
    <section className="bg-gray-100 py-32 md:py-40 px-6 xl:px-32 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Kontak Info */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-800 space-y-6 text-justify text-base"
          >
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              Hubungi Kami
            </h1>
            <p className="leading-relaxed">
              Kami di <strong>storePHONE</strong> siap membantu Anda! Hubungi
              kami untuk pertanyaan produk, bantuan pemesanan, atau saran dan
              masukan. Tim kami akan merespon secepat mungkin di jam operasional
              berikut:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Senin – Jumat:</strong> 09.00 – 17.00
              </li>
              <li>
                <strong>Sabtu:</strong> 09.00 – 13.00
              </li>
              <li>
                <strong>Minggu & Hari Libur:</strong> Tutup
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <MdEmail className="text-xl text-gray-700" />
              <a
                href="mailto:support@storephone.id"
                className="text-blue-600 hover:underline text-base"
              >
                support@storephone.id
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-xl text-green-600" />
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-base"
              >
                +62 812-3456-7890
              </a>
            </div>
          </motion.div>

          {/* Formulir */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-[420px] lg:max-w-lg ml-auto"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Formulir Kontak
            </h2>
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col gap-4 text-base"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  required
                  value={name}
                  onChange={handleNameChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                {nameError && (
                  <p className="text-sm text-red-600 mt-1">{nameError}</p>
                )}
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Anda"
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />

              <div>
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  rows="5"
                  required
                  value={message}
                  onChange={handleMessageChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">
                    {message.trim().length} / 1000 Karakter
                  </span>
                  {messageError && (
                    <span className="text-red-600">{messageError}</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white text-base font-semibold py-3 rounded hover:bg-blue-700 transition duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
