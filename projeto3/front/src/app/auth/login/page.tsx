'use client';

import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Button, Form, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface UserType {
  name: string;
  email: string;
  password: string;
}

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogin = async (values: UserType) => {
    try{
      setLoading(true);
      const res =  await axios.post('http://localhost:3000/login', values);
        if(res.data.statuCode === 200){
          message.error(res.data.message)
          return;
        }

        //Administrar o token
        message.success(res.data.message);
        router.push('/')

    } catch (error: any) {
      message.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* logo aqui */}
      <div className="h-full bg-primary hidden md:flex items-center justify-center">
        <h1 className="text-7xl font-bold text-red-500">Frame</h1>
        <h1 className="text-7xl font-bold text-gray-500">-</h1>
        <h1 className="text-7xl font-bold text-blue-500">Shop</h1>
      </div>
      {/* campos de register */}
      <div>
        <div className="flex items-center justify-center h-full">
          <Form
            className="w-[500px] flex flex-col gap-5"
            layout="vertical"
            onFinish={ onLogin }
          >
            <h1 className="text-2xl font-bold">Login</h1>
            <hr />

            <Form.Item
              name="email"
              label="Email"
              rules={getAntdFieldsRequireRule('Please input your email')}
            >
              <input type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={getAntdFieldsRequireRule('Please input your password')}
            >
              <input type="password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>

            <Link href="/auth/login" className="text-primary">
              Dont have an account ? Register
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;


