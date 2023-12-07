import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Button, Form, Upload, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ProductForm({ setSelectedFiles, loading, onSave}: ProductFormProps) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const getCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/category');
      setCategories(res.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        onFinish={onSave}
      >
        <div className="col-span-3">
          <Form.Item
            label="Name"
            name="name"
            rules={getAntdFieldsRequireRule('Please input product name')}
          >
            <input type="text" />
          </Form.Item>
        </div>
        <div className="col-span-3">
          <Form.Item
            label="Description"
            name="description"
            rules={getAntdFieldsRequireRule('Please input description')}
          >
            <textarea />
          </Form.Item>
        </div>
        <Form.Item
          label="Price"
          name="price"
          rules={getAntdFieldsRequireRule('Please input product price')}
        >
          <input type="number" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={getAntdFieldsRequireRule('Please select category')}
        >
          <select>
            <option value="">Select Category</option>
            {/* loading categories */}
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Form.Item>
        <Form.Item
          label="Count In Stock"
          name="stock"
          rules={getAntdFieldsRequireRule('Please input count in stock')}
        >
          <input type="number" />
        </Form.Item>

        <div className="col-span-3">
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={
              (file) => {
                setSelectedFiles((prev: any) => [...prev, file]);
                return false;
              }
            }
          >Upload</Upload>
        </div>
        <div className="col-span-3 gap-5 flex justify-end ">
          <Button
            onClick={() => {
              console.log('back');
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductForm;

interface ProductFormProps {
  setSelectedFiles: any;
  loading: boolean;
  onSave: any;
}