import axios from "axios"
import { Link } from "react-router"
import type { CartData } from "../types/cart"
import { QuantityControl } from "../components/QuantityControl"
import {
  apiPublicUpdateCartItem,
  apiPublicRemoveCartItem,
} from "../apis/cart"
import { useAppDispatch } from '../store/hooks'
import { getAsyncCarts } from '../slices/cartSlice'
import { useMessage } from "../hooks/useMessage"

type MiniCartTableProps = {
  cartData: CartData
  waiting: boolean
  canChangeOrder: boolean
  setWaiting: (boo: boolean) => void
}

export const MiniCartTable = ({ cartData, waiting, setWaiting, canChangeOrder }: MiniCartTableProps) => {
  const dispatch = useAppDispatch()
  const { showSuccess, showError } = useMessage()
  const removeItem = async (id: string) => {
    try {
      const response = await apiPublicRemoveCartItem(id)
      dispatch(getAsyncCarts())
      showSuccess(response.data.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法調整購物車，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    }
  }

  const updateItemQty = async (cartItemId: string, nextQty: number) => {
    setWaiting(true)
    try {
      await apiPublicUpdateCartItem({
        product_id: cartItemId,
        qty: nextQty
      })
      dispatch(getAsyncCarts())
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法調整購物車，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    } finally {
      setWaiting(false)
    }
  }

  return (
    <>
      <div className="mt-3 md-mt-0 border border-secondary rounded-3 bg-light">
        {
          cartData.carts.map((item, index) => {
            return (
              <div className="p-3 border-bottom border-secondary position-relative" key={index}>
                <div className="d-flex text-dark justify-content-between">
                  <div className="d-flex gap-3">
                    <div className="cart-img-container">
                      <img className="rounded-3" src={item.product.imageUrl} alt={item.product.title} />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <Link className="text-decoration-none" to={`/product/${item.product.id}`}>
                        <p className="mb-0 fw-bold ">{item.product.title}</p>
                      </Link>
                      <p className="mb-0">{`${item.product.price} / ${item.qty} ${item.product.unit}`}</p>
                      {
                        canChangeOrder ?
                          (<QuantityControl
                            waiting={waiting}
                            quantity={item.qty}
                            justifyStart={true}
                            onIncrease={() => updateItemQty(item.id, item.qty + 1)}
                            onDecrease={() => updateItemQty(item.id, Math.max(1, item.qty - 1))}
                          />)
                          :
                          ('')
                      }
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center ">
                    <p className="fs-5 fw-bold mb-0">
                      $ {item.total}
                    </p>
                  </div>
                </div>
                {
                  canChangeOrder ?
                  (<div className="position-absolute top-0 end-0">
                  <i className="bi bi-x-circle fs-5 text-danger me-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeItem(item.id)}
                  ></i>
                </div>) : ('')
                }
              </div>
            )
          })
        }
      </div>
    </>
  )
}