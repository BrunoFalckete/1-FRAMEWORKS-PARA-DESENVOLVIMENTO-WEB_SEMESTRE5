'use client'

import { Button } from 'antd'
import React from 'react'

export default function ProductActionButtons({ product = {}}:{ product: any }) {
  return (
    <div className='flex gap-5'>
      <Button type='default'>Add Cart</Button>
      <Button type='primary'>Buy now</Button>
    </div>
  )
}