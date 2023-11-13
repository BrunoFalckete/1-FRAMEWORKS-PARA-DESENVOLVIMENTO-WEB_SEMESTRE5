'use client';

import { Button, Form, message } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAntdFieldsRequireRule } from '@/helpers/validations';

interface UserType {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onRegister = async (values: UserType) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/user', values).then((res) => {
        setLoading(false);
        message.success('Register success, please login to continue');
        router.push('/auth/login');
        console.log(res);
      });
    } catch (error: any) {
      message.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="h-full bg-primary hidden md:flex items-center justify-center">
        <h1 className="text-7xl font-bold text-red-500">Shey</h1>
        <h1 className="text-7xl font-bold text-gray-500">-</h1>
        <h1 className="text-7xl font-bold text-blue-500">Shop</h1>
      </div>
      <div>
        <div className="flex items-center justify-center h-full">
          <Form
            onFinish={onRegister}
            className="w-[400px] flex flex-col gap-5"
            layout="vertical"
          >
            <h1 className="text-2xl font-bold">Register</h1>
            <hr />
            <Form.Item
              name="name"
              label="Name"
              rules={getAntdFieldsRequireRule('Please input your name!')}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={getAntdFieldsRequireRule('Please input your email!')}
            >
              <input type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={getAntdFieldsRequireRule('Please input your password!')}
            >
              <input type="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>

            <Link href="/auth/login" className="text-primary">
              Already have an account? Login
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
