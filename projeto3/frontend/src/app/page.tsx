import { Button, Rate } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image';
import AddToCartBtn from './profile/components/AddToCartBtn';
import Link from 'next/link';

async function getProducts() {
  try {
    const cookStore = cookies().get('token')?.value;

    const resp = await axios.get('http://localhost:3000/product', {
      headers: {
        Authorization: `Bearer ${cookStore}`,
      },
    });
    return resp.data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="p-4 flex flex-col gap-1 border border-solid border-gray-300"
          >
            <Link href={`/product/${product.id}`}>
              <div className="text-center">
                <Image
                  src={product.images[0].url}
                  width={200}
                  height={300}
                  alt=""
                  className="object-scale-down"
                ></Image>
              </div>
              <h1 className="text-sm">{product.name}</h1>
            </Link>
            <div className="flex justify-between items-center">
              <Rate disabled defaultValue={product.rating}></Rate>
              <div className="flex gap-5 items-center">
                <h1 className="text-xl font-semibold">$ {product.price}</h1>
                <AddToCartBtn product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}