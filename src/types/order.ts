import type { TPagination } from '../types/product'
import type { ProductData } from '../types/product'

export type orderData = {
  user: {
    name: string
    email: string
    tel: string
    address: string
  }
  message?: string
}

export type TOrder = {
  create_at: number
  id: string
  is_paid: boolean
  message: string
  products: {}
  total: number
  user: {
    name: string
    email: string
    tel: string
    address: string
  }
  num: number
}

export type orderConfirmedResponse = {
  success: boolean
  message: string
  total: number
  create_at: string
  orderId: string
}

export type getOrdersResponse = {
  success: boolean
  orders: TOrder[]
  pagination: TPagination
  messages: []
}

export type getOrderResponse = {
  success: boolean
  order: TOrder
  pagination: TPagination
  messages: []
}


export type TOrderInfo = {
  final_total: number
  id: string
  product: ProductData
  product_id: string
  qty: number
  total: number
}

export type DeleteOrderResponse = {
  success: boolean
  message: string
}

export type PayOrderResponse = {
  success: boolean
  message: string
}