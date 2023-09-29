'use client'

import { Button, Form } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { getAntdFildsRequireRule } from '../../../helpers/validation';

interface UserType {
  name: string;
  email: string;
  password: string;
}


function Register() {
  const [loading, setLoading] = useState(false);

  const onRegister = async (values: any) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* logo aqui */}
      <div className='h-full bg-primary hidden md:flex items-center justify-center'>
        <h1 className="text-7xl font-bold text-red-500">Frame</h1>
        <h1 className="text-7xl font-bold text-gray-500">-</h1>
        <h1 className="text-7xl font-bold text-blue-500">Shop</h1>
      </div>
      {/* campos de register */}
      <div>

        <div className="flex items-center justify-center h-full">

          <Form className='w-[500px] flex flex-col gap-5' layout='vertical' onFinish={onRegister}>
            <h1 className="text-5xl font-bold">Register</h1>
            <hr />
            <Form.Item name='name' label='Name' rules={getAntdFildsRequireRule("Please input your name")}>
              <input type="text" />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={getAntdFildsRequireRule("Please input your email")}>
              <input type="email" />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={getAntdFildsRequireRule("Please input your password")}>
              <input type="password" />
            </Form.Item>

            <Button type='primary' htmlType='submit' block loading={loading}>Register</Button>

            <Link href='/auth/login' className='text-primary'>Alredy have an account? Login</Link>
          </Form>

        </div>

      </div>
    </div>
  );
}

export default Register;