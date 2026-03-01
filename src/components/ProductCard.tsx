import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router'
import type { ProductData } from "../types/product"
import { apiPublicAddCartItem } from "../apis/cart"
import { GrowingSpinnerButton } from '../components/Spinner'
import { useMessage } from "../hooks/useMessage"
import { getAsyncCarts } from '../slices/cartSlice'
import { useAppDispatch } from '../store/hooks'

type ProductCardProps = {
  product: ProductData
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { showSuccess, showError } = useMessage()
  const [waitingId, setIsWaitingId] = useState<string>('')
  const dispatch = useAppDispatch()

  const addToCart = async (id: string, quantity: number) => {
    setIsWaitingId(id)
    try {
      const response = await apiPublicAddCartItem({ product_id: id, qty: quantity })
      dispatch(getAsyncCarts())
      showSuccess(response.data.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法加入購物車，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    } finally {
      setIsWaitingId('')
    }
  }

  return (
    <div className="mb-4">
      <Link className="text-decoration-none" to={`/product/${product.id}`}>
        <div className="flex flex-col group cursor-pointer">
          <div className="img-container mb-4">
            <img className="rounded-3" src={product.imageUrl} alt={product.title} />
          </div>
          <div className="d-flex justify-content-between">
            <h5 className="">{product.title}</h5>
            <p className="fs-5 fw-bold mb-0">${product.price}</p>
          </div>
          <span className="text-muted small ">
            {product.description}
          </span>
        </div>
      </Link>
      <div className="d-flex justify-content-end mt-2">
        {
          waitingId === product.id ? (
            <GrowingSpinnerButton />
          ) : (
            <button type="button" className="btn btn-outline-primary"
              onClick={() => addToCart(product.id, 1)}>加入購物車
            </button>
          )
        }
      </div>
    </div>
  )
}