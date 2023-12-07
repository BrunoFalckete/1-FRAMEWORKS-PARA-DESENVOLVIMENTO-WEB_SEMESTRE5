'use client';
import { CartState } from '@/redux/cartSlice';
import { Popover, Button, message, Badge } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();

  const { cartItems }: CartState = useSelector((state: any) => state.cart);

  const dispatch = useDispatch();

  const isPrivatePage =
    pathName !== '/auth/login' && pathName !== '/auth/register';

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

  useEffect(() => {
    //when the cartItems changes, we will save cartItems into localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems])

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
          <div
            className="flex cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            <h1 className="text-2xl font-bold text-red-500">Frame Shop</h1>
          </div>
          <div className="flex gap-5 items-center">
            <Badge count={cartItems.length} className="cursor-pointer">
              <i
                className="ri-shopping-cart-line text-white text-2xl cursor-pointer"
                onClick={() => {
                  router.push('/cart');
                }}
              ></i>
            </Badge>
            <Popover content={content} title="Title" trigger="click">
              <div className="flex h-8 w-8 bg-white">{currentUser}</div>
            </Popover>
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export default LayoutProvider;
