import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint"; // Ganti dengan URL backend Anda
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL_PRODUCT}/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        form.setFieldsValue({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
          kondisi: res.data.kondisi,
          ram: res.data.ram,
          rom: res.data.rom,
          warna: res.data.warna,
          stock: res.data.stock,
        });
        // Mengatur thumbnail saat ini
        if (res.data.thumbnail) {
          setFileList([
            {
              uid: "-1",
              name: "thumbnail.png",
              status: "done",
              url: res.data.thumbnail,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangani submit form
  const handleSubmit = async (values) => {
    setLoading(true);

    if (
      fileList.length === 0 ||
      (!fileList[0].originFileObj && !fileList[0].url)
    ) {
      message.error("Please upload a thumbnail!");
      setLoading(false);
      return;
    }

    console.log("values", values);
    const data = new FormData();
    data.append("name", values.name);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append('kondisi', values.kondisi);
    data.append('ram', values.ram);
    data.append('rom', values.rom);
    data.append('warna', values.warna);
    data.append("stock", values.stock);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      data.append("thumbnail", fileList[0].originFileObj);
    }

    try {
      await axios.patch(`${URL_PRODUCT}/${id}`, data);
      message.success("Product added successfully");
      form.resetFields();
      setFileList([]);
      navigate("/dashboard/products");
    } catch (error) {
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani perubahan file upload
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div>
      <h1>Edit Product</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          category: "electronics", // Menentukan kategori default
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input type='number' placeholder="Enter product price" />
        </Form.Item>

        <Form.Item
          name="kondisi"
          label="Kondisi"
          rules={[{ required: true, message: "Please input product kondisi" }]}
        >
          <Input placeholder="Enter product kondisi" />
        </Form.Item>

        <Form.Item
          name="ram"
          label="Ram"
          rules={[{ required: true, message: "Please input product ram" }]}
        >
          <Input type='number' placeholder="Enter product ram" />
        </Form.Item>

        <Form.Item
          name="rom"
          label="Rom"
          rules={[{ required: true, message: "Please input product rom" }]}
        >
          <Input type='number' placeholder="Enter product rom" />
        </Form.Item>

        <Form.Item
          name="warna"
          label="Warna"
          rules={[{ required: true, message: "Please input product warna" }]}
        >
          <Input placeholder="Enter product warna" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
        >
          <Input.TextArea placeholder="Enter product description" rows={4} />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please enter product stock" }]}
        >
          <Input type="number" placeholder="Enter stock quantity" />
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
