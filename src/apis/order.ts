import axios, { type AxiosResponse } from 'axios'
import type {
  orderData,
  orderConfirmedResponse,
  DeleteOrderResponse,
} from '../types/order'
import type {
  getOrdersResponse,
  getOrderResponse,
  PayOrderResponse,
} from '../types/order'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const orderApi = axios.create({
  baseURL: API_BASE,
})

orderApi.interceptors.request.use(
  (request) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ReactToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    )

    if (token) {
      request.headers['Authorization'] = token
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

orderApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const apiPublicPostOrder = (
  params: orderData,
): Promise<AxiosResponse<orderConfirmedResponse>> =>
  orderApi.post(`/api/${API_PATH}/order`, { data: params })

export const apiPublicGetOrder = (
  id: string,
): Promise<AxiosResponse<getOrderResponse>> =>
  orderApi.get(`/api/${API_PATH}/order/${id}`)

export const apiAdminGetOrders = (params: {
  page?: string
}): Promise<AxiosResponse<getOrdersResponse>> =>
  orderApi.get(`/api/${API_PATH}/admin/orders`, { params })

export const apiAdminDeleteOrder = (
  orderId: string,
): Promise<AxiosResponse<DeleteOrderResponse>> =>
  orderApi.delete(`/api/${API_PATH}/admin/order/${orderId}`)

export const apiPublicPayOrder = (
  id: string,
): Promise<AxiosResponse<PayOrderResponse>> =>
  orderApi.post(`/api/${API_PATH}/pay/${id}`)
