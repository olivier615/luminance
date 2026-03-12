import axios from "axios"
import { Link } from "react-router"
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { selectCart } from '../slices/cartSlice'
import { useNavigate } from "react-router"
import type { CartData } from "../types/cart"
import {
  apiPublicUpdateCartItem,
  apiPublicRemoveCartItem,
  apiPublicRemoveAllItem
} from "../apis/cart"
import { QuantityControl } from "../components/QuantityControl"
import { TotalPriceCard } from '../components/TotalPriceCard'
import { useMessage } from "../hooks/useMessage"
import { getAsyncCarts } from '../slices/cartSlice'
import { useAppDispatch } from '../store/hooks'
import { MiniCartTable } from '../components/MiniCartTable'

export const Cart = () => {
  const dispatch = useAppDispatch()
  const cart = useSelector(selectCart)
  const { showSuccess, showError } = useMessage()
  const navigate = useNavigate()
  const [waiting, setWaiting] = useState<boolean>(false)
  const [cartData, setCartData] = useState<CartData>({
    carts: [],
    final_total: 0,
    total: 0,
  })

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

  const removeAllItem = async () => {
    try {
      const response = await apiPublicRemoveAllItem()
      showSuccess(response.data.message)
      dispatch(getAsyncCarts())
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

  useEffect(() => {
    setCartData({
      ...cart
    })
  }, [cart])

  return (
    <>
      <div className="container">
        <div className="text-center my-5">
          {cartData.carts.length === 0
            ?
            <p className="text-primary fs-5 fw-bold mb-3">購物車還是空的，快去看看吧 ：）</p>
            :
            <>
              <p className="text-primary fs-5 fw-bold mb-3">Your Cart</p>
              <p className="fw-bold text-dark fs-3 mb-5">購物車</p>
            </>
          }
        </div>
        <>
          <div className="row">
            <div className="col-lg-9 col-12">
              <table className="d-none d-md-table table align-middle text-center">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">商品名稱</th>
                    <th scope="col">分類</th>
                    <th scope="col">單價</th>
                    <th scope="col">購買數量</th>
                    <th scope="col">金額</th>
                    <th scope="col">移除商品</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.carts.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="d-flex justify-content-center">
                          <div className="cart-img-container">
                            <img className="rounded-3" src={item.product.imageUrl} alt={item.product.title} />
                          </div>
                        </td>
                        <td>
                          <Link to={`/product/${item.product.id}`}>
                            {item.product.title}
                          </Link>
                        </td>
                        <td>{item.product.category}</td>
                        <td>{`${item.product.price} / ${item.product.unit}`}</td>
                        <td>
                          <QuantityControl
                            waiting={waiting}
                            justifyStart={false}
                            quantity={item.qty}
                            onIncrease={() => updateItemQty(item.id, item.qty + 1)}
                            onDecrease={() => updateItemQty(item.id, Math.max(1, item.qty - 1))}
                          />
                        </td>
                        <td>{item.total}</td>
                        <td>
                          <i className="bi bi-x-circle fs-5 text-danger"
                            style={{ cursor: 'pointer' }}
                            onClick={() => removeItem(item.id)}
                          ></i>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="d-block d-md-none">
                <MiniCartTable
                  cartData={cartData}
                  waiting={waiting}
                  setWaiting={setWaiting}
                  canChangeOrder={true}
                />

              </div>
              {
                cartData.carts.length !== 0 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger my-3"
                    onClick={removeAllItem}
                  >
                    移除所有商品
                  </button>
                )
              }

            </div>
            <div className="col-lg-3 col-12">
              {/* <CouponCard /> */}
              <TotalPriceCard />
              <button
                type="button"
                disabled={cartData.carts.length === 0}
                className="btn btn-outline-primary mt-3 w-100 mb-5"
                onClick={() => navigate('/create_order')}
              >
                開始結帳
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  )
}
