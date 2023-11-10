'use client'
import { Button, Popover, message } from "antd";
import  React, { useEffect, useState }  from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {

  const [currentUser, setCurrentUser] = React.useState("")
  const [loading, setLoading] = useState(false)

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      //get axios in backend
      setCurrentUser('Bruno')
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  return(

  <div>
    <div className="bg-primary py-5 px-5 flex justify-between">
      <div className="flex">
        <h1 className="2xl font-bolt texte-red-500">Frame Shop</h1>
      </div>
      <div className="flex gap-r itens-center">
        <i className="ri-shooping-cart-line text-white"></i>

        <div>
          <Popover content={content} title="Title" trigger="click">
             <div className="flex h-8 w-8 bg-white">{currentUser}</div>
          </Popover>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LayoutProvider
