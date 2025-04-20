import React, { useEffect, useState } from "react";
import { Card, Button, Input, Form, Col, Row, message } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT, URL_TRANSACTION } from "../utils/Endpoint";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil jumlah dari state lokasi (dikirim dari DetailProduct.jsx)
  const quantity = location.state?.quantity || 1;

  useEffect(() => {
    axios
      .get(`${URL_PRODUCT}/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("err", err.response);
      });
  }, [id]);

  const handleCheckout = async (values) => {
    if (!product) return;

    if (quantity > product.stock) {
      message.error("Jumlah melebihi stok yang tersedia");
      return;
    }

    const finalPrice = product.price; // Tanpa diskon

    const data = {
      first_name: values.first_name,
      amount: finalPrice * quantity,
      product_id: product._id,
    };

    try {
      setLoading(true);

      const res = await axios.post(URL_TRANSACTION, data);
      const snapToken = res.data.snap_token;

      // Simpan jumlah ke localStorage
      localStorage.setItem("checkoutQuantity", quantity);

      // Jalankan Snap popup langsung dari halaman
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log("Pembayaran sukses", result);
          navigate(`/success-payment/${product._id}`);
        },
        onPending: function (result) {
          console.log("Menunggu pembayaran", result);
        },
        onError: function (result) {
          console.error("Pembayaran gagal", result);
          message.error("Terjadi kesalahan saat memproses pembayaran.");
        },
        onClose: function () {
          console.log("Popup ditutup oleh pengguna");
          message.warning("Pembayaran dibatalkan");
        },
      });
    } catch (err) {
      message.error("Gagal melakukan checkout");
      console.error("Checkout error", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const finalPrice = product ? product.price : 0; // Harga tanpa diskon

  return (
    <div className="px-4 py-6 mt-20 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
        Checkout
      </h1>
      <Row gutter={[16, 16]} wrap>
        <Col xs={24} md={16}>
          <Card
            title="Detail Produk"
            extra={<ShoppingCartOutlined />}
            className="shadow-md"
          >
            <p className="mb-2">
              <strong>Nama Produk: </strong>
              <span className="font-poppins">{product?.name}</span>
            </p>
            <p className="mb-2">
              <strong>Harga Produk: </strong>
              <span className="font-bold">
                Rp{finalPrice.toLocaleString("id-ID")}
              </span>
            </p>
            <hr className="my-5" />
            <p>
              <strong>Jumlah:</strong> {quantity}
            </p>
            <p className="text-xl font-semibold mt-2">
              Total: Rp{(finalPrice * quantity).toLocaleString("id-ID")}
            </p>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title="Informasi Pembayaran"
            extra={<CreditCardOutlined />}
            className="shadow-md"
          >
            <Form layout="vertical" form={form} onFinish={handleCheckout}>
              <Form.Item
                name="first_name"
                label="Nama Anda"
                rules={[
                  {
                    required: true,
                    message: "Nama harus di isi",
                  },
                ]}
              >
                <Input placeholder="Masukkan nama Anda" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  Lanjut ke Pembayaran
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
