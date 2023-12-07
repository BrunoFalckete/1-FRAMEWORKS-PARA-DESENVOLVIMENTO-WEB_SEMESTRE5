'use client'
import { Button, Table, message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

function ProductsList() {
  const router = useRouter();

  const [products, setProducts] = useState([])
  const [loading, setloading] = useState(false)

  const getProducts = async () => {
    try {
      setloading(true)
      const res = await axios.get('http://localhost:3000/product');
      setProducts(res.data)
    } catch (error:any) {
      message.error(error.message);
    } finally {
      setloading(false)
    }
  };

  useEffect(() => {
    getProducts()
  }, [])

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <img
          src={record.images[0].url || ""}
          alt={record.name}
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <span>{description}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{price}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{price}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{moment(createdAt).format("DD MMM YYYY hh:mm A")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: any, params: any) => {
        return (
          <div className="flex gap-3 items-center">
            <Button
              type="primary"
              className="mr-2a btn-small"
              onClick={() => {}}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              className="btn-small"
              onClick={() => {}}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            router.push('/profile/add_product');
          }}
        >
          Add Product
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="_id"
      ></Table>
    </div>
  );
}

export default ProductsList;