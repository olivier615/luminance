import axios from "axios"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useMessage } from "../hooks/useMessage"
import type { CartData } from "../types/cart"
import { apiPublicPostOrder } from '../apis/order'
import { apiPublicGetCartData } from "../apis/cart"
// import { CouponCard } from '../components/CouponCard'
import { TotalPriceCard } from '../components/TotalPriceCard'
import type { orderData } from '../types/order'
import { MiniCartTable } from '../components/MiniCartTable'
import { useAppDispatch } from '../store/hooks'
import { getAsyncCarts } from '../slices/cartSlice'

export const CreateOrder = () => {
  const dispatch = useAppDispatch()
  const { showSuccess, showError } = useMessage()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<orderData>({ mode: 'onChange' })
  // const [_, setIsLoading] = useState<boolean>(true)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [cartData, setCartData] = useState<CartData>({
    carts: [],
    final_total: 0,
    total: 0,
  })

  const getCartData = async () => {
    try {
      const response = await apiPublicGetCartData()
      setCartData(response.data.data)
      // setIsLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法取得產品資料，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    }
  }
  const onSubmit = async (data: orderData) => {
    try {
      const response = await apiPublicPostOrder(data)
      showSuccess(response?.data.message ?? "訂單已成立！")
      dispatch(getAsyncCarts())
      // api 會自動清空購物車，要記得把 store 的 cart slice 也更新一次
      navigate(`/payment/${response.data.orderId}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法完成訂單，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line 
    getCartData()
    // eslint-disable-next-line 
  }, [])

  return (<>
    <div className="container my-5">
      <div className="text-center my-5">
        <p className="text-primary fs-5 fw-bold mb-3">Place an Order</p>
        <p className="fw-bold text-dark fs-3 mb-5">建立訂單</p>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <p className="fw-bold text-dark fs-5 text-center mb-3">收件人資料</p>
          <form
            id="form"
            className="form-signin"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-floating input-group-sm">
              <input
                type="text"
                className="form-control"
                id="name"
                autoFocus
                {...register("user.name", {
                  required: "請輸入收件人名稱",
                })}
              />
              <label htmlFor="name">收件人</label>
              <span className="text-danger d-block" style={{ minHeight: 28 }}>
                {errors.user?.name?.message}
              </span>
            </div>
            <div className="form-floating input-group-sm">
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("user.email", {
                  required: "Email 是必填項目",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的 Email",
                  },
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="text-danger d-block" style={{ minHeight: 28 }}>
                {errors.user?.email?.message}
              </span>
            </div>
            <div className="form-floating input-group-sm">
              <input
                type="tel"
                className="form-control"
                id="tel"
                {...register("user.tel", {
                  required: "電話是必填項目",
                  minLength: {
                    value: 6,
                    message: "電話長度至少需為 6 個字元",
                  }
                })}
              />
              <label htmlFor="tel">電話</label>
              <span className="text-danger d-block" style={{ minHeight: 28 }}>
                {errors.user?.tel?.message}
              </span>
            </div>
            <div className="form-floating input-group-sm">
              <input
                type="text"
                className="form-control"
                id="address"
                {...register("user.address", {
                  required: "寄件人是必填項目",
                })}
              />
              <label htmlFor="address">收件地址</label>
              <span className="text-danger d-block" style={{ minHeight: 28 }}>
                {errors.user?.address?.message}
              </span>
            </div>
            <div className="form-floating input-group-sm">
              <input
                type="textarea"
                className="form-control"
                id="message"
                {...register("message", {
                  required: false,
                })}
              />
              <label htmlFor="message">其他備註</label>
            </div>
            <button
              className="btn btn-lg btn-primary w-100 mt-3"
              type="submit"
            >
              確認訂單
            </button>
          </form>
        </div>
        <div className="col-12 offset-0 offset-lg-1 col-md-6 col-lg-5 mt-5 mt-md-0">
          {/* <CouponCard /> */}
          <TotalPriceCard />
          <p className="fw-bold text-dark fs-5 text-center my-3">訂單內容</p>
          <MiniCartTable
            cartData={cartData}
            waiting={waiting}
            setWaiting={setWaiting}
            canChangeOrder={false}
          />
        </div>
      </div>
    </div>
  </>)
}