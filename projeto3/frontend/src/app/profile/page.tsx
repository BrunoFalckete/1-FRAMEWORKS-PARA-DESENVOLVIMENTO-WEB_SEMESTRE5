'use client';
import React from 'react';
import { Tabs, TabsProps } from 'antd';
import CategoriesList from './components/CategoriesList';

function Profile() {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Products',
      children: 'Content of Tab Products',
    },
    {
      key: '2',
      label: 'Categories',
      children: <CategoriesList />,
    },
    {
      key: '3',
      label: 'Orders',
      children: 'Content of Tab Orders',
    },
    {
      key: '4',
      label: 'Users',
      children: 'Content of Tab Users',
    },
  ];

  return (
    <div className='p-5'>
      <Tabs defaultActiveKey="1"items={items}>

      </Tabs>
    </div>
  );
}

export default Profile;
