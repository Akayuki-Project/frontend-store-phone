import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { URL_PRODUCT } from "../utils/Endpoint";

const SuccessPayment = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const quantity = parseInt(localStorage.getItem("checkoutQuantity")) || 1;

  useEffect(() => {
    const fetchProductAndUpdateStock = async () => {
      try {
        const res = await axios.get(`${URL_PRODUCT}/${id}`);
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);

        await axios.patch(`${URL_PRODUCT}/${id}`, {
          sales: (fetchedProduct.sales || 0) + quantity,
          stock: (fetchedProduct.stock || 0) - quantity,
        });

        localStorage.removeItem("checkoutQuantity");
      } catch (err) {
        console.log("Error updating stock/sales:", err.response || err.message);
      }
    };

    fetchProductAndUpdateStock();
  }, [id, quantity]);

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 max-w-xl w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✅</div>
        <h4 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
          Pembayaran Berhasil
        </h4>

        <div className="flex flex-wrap justify-center gap-x-1 text-gray-700 text-lg md:text-xl mb-6">
          <span>Terima Kasih Telah Belanja di</span>
          <span className="text-foreground font-bold">Store</span>
          <span className="text-primary font-bold">Phone</span>
        </div>

        <button
          onClick={() => navigate("/product")}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-all"
        >
          <ChevronLeft size={20} />
          Kembali
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;