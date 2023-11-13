'use client';
import { Popover, Button, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const isPrivatePage =
    pathName !== "/auth/login" && pathName !== "/auth/register";

  const content = (
    <div className="flex flex-col gap-2 p-2">
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => {
          router.push('/profile');
        }}
      >
        <i className="ri-user-line text-xl"></i>
        <span>Profile</span>
      </div>
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => {
          router.push('/logout');
        }}
      >
        <i className="ri-logout-box-r-line"></i>
        <span>Logout</span>
      </div>
    </div>
  );

  useEffect(() => {
    1;
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      // get axios in backend
      setCurrentUser('Beto');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {isPrivatePage && (
        <div className="bg-primary py-5 px-5 flex justify-between items-center">
          <div className="flex">
            <h1 className="text-2xl font-bold text-red-500">Frame Shop</h1>
          </div>
          <div className="flex gap-5 items-center">
            <i className="ri-shopping-cart-line text-white text-2xl"></i>
            <Popover content={content} title="Title" trigger="click">
              <div className="flex h-8 w-8 bg-white">{currentUser}</div>
            </Popover>
          </div>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
