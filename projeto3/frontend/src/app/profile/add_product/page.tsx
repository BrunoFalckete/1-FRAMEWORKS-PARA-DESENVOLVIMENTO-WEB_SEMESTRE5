'use client';

import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { useRouter } from 'next/navigation';
import { uploadImageAndReturnUrls } from '@/helpers/imageHandle';
import { message } from 'antd';
import axios from 'axios';

function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  interface AddFormProps {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
  }

  interface ImgFormProps {
    url: string;
    productId: string;
  }

  //save product with imagens
  const onSave = async (values: AddFormProps) => {
    try {
      setLoading(true);
      const imgUrls = await uploadImageAndReturnUrls(selectedFiles);
      values.price = Number(values.price);
      values.stock = Number(values.stock);
      values.categoryId = String(values.categoryId);

      //save product info
      const respProduct = await axios.post(
        'http://localhost:3000/product',
        values
      );

      if (imgUrls && imgUrls.length > 0) {
        imgUrls.forEach((img) => {
          const imgForm: ImgFormProps = {
            url: img,
            productId: respProduct.data.id,
          };
          console.log(imgForm.url);

          axios.post('http://localhost:3000/image', imgForm);
        });
      }

      message.success('Product saved successfully');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
      <hr />

      <ProductForm
        setSelectedFiles={setSelectedFiles}
        loading={loading}
        onSave={onSave}
      />
    </div>
  );
}

export default AddProduct;
