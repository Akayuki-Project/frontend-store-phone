import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Produk apa yang ada disini?</h2>
          <p className="text-sm mt-2 text-gray-300">
            Kami menjual produk Handphone second dengan kualitas dan kondisi
            performa terbaik, kami juga menyediakan garansi selama 1 tahun.
          </p>
        </div>

        <div>
          <h3 className="text-base font-medium">Kontak Kami :</h3>
          <div className="flex justify-center gap-5 mt-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6">© 2025 storePHONE Indonesia</p>
      </div>
    </footer>
  );
}
