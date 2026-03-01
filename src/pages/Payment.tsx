import axios from "axios"
import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { apiPublicGetOrder, apiPublicPayOrder } from '../apis/order'
import { useMessage } from "../hooks/useMessage"
import type { TOrder, TOrderInfo } from '../types/order'

export const Payment = () => {
  const navigate = useNavigate()
  const { showSuccess, showError } = useMessage()
  const { id } = useParams()
  const [orderInfo, setOrderInfo] = useState<TOrder>({
    create_at: 0,
    id: '',
    is_paid: false,
    message: '',
    products: {},
    total: 0,
    user: {
      name: '',
      email: '',
      tel: '',
      address: ''
    },
    num: 0
  })
  const [productList, setProductList] = useState<TOrderInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getOrder = async () => {
    try {
      const response = await apiPublicGetOrder(id!)
      if (!response.data.order) {
        showError('找不到該筆訂單')
        navigate('/')
        return
      }
      setOrderInfo(response.data.order)
      getOrderData(response.data.order)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法取得訂單，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    }
  }

  const payOrder = async () => {
    setIsLoading(true)
    try {
      const response = await apiPublicPayOrder(id!)
      showSuccess(response?.data.message ?? "支付完成！")
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法進行支付，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getOrderData = (order: TOrder) => {
    const list: TOrderInfo[] = Object.values(order.products)
    setProductList([...list])
  }

  useEffect(() => {
    getOrder()
  }, [])

  return (
    <>
      <div className="container my-5">
        <div className="">
          <p className="text-primary fs-5 fw-bold mb-3">Payment</p>
          <p className="fw-bold text-dark fs-3 mb-5">進行支付</p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-title mb-3 text-center text-dark fs-5 fw-bold">信用卡資料</p>
                <form id="form" className="form-signin">
                  <div className="form-floating input-group-sm mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      autoFocus
                    />
                    <label htmlFor="name">持卡人姓名</label>
                  </div>
                  <div className="form-floating input-group-sm mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                    />
                    <label htmlFor="cardNumber">信用卡號碼</label>
                  </div>
                  <div className="d-flex gap-3">
                    <div className="form-floating input-group-sm mb-3 w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="expiration"
                      />
                      <label htmlFor="expiration">有效期限 MM/YY</label>
                    </div>
                    <div className="form-floating input-group-sm mb-3 w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                      />
                      <label htmlFor="cvv">CVV / CVC</label>
                    </div>
                  </div>
                  <div className="">
                    {
                      isLoading ?
                        (<button
                          type="button"
                          className="btn btn-primary w-100"
                          disabled
                        >
                          <div className="spinner-grow spinner-grow-sm text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </button>)
                        :
                        (<button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={payOrder}
                        >
                          確認支付
                        </button>)
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 offset-0 offset-lg-1 col-md-6 col-lg-5 mt-5 mt-md-0">
            <div className="card mb-3">
              <div className="card-body">
                <p className="card-title text-dark fs-5 fw-bold">
                  訂單資料
                </p>
                <p className="card-text">
                  收件人：{orderInfo.user.name}
                </p>
                <p className="card-text">
                  Email：{orderInfo.user.email}
                </p>
                <p className="card-text">
                  電話：{orderInfo.user.tel}
                </p>
                <p className="card-text">
                  收件地址：{orderInfo.user.address}
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <p className="card-title text-dark fs-5 fw-bold mb-0">
                  訂單金額：{orderInfo.total}
                </p>
              </div>
            </div>
            <p className="fw-bold text-dark fs-5 text-center my-3">訂單內容</p>
            <div className="mt-3 md-mt-0 border border-secondary rounded-3 bg-light">
              {
                productList ?
                  (
                    productList.map((order, index) => {
                      return (
                        <div
                          className="p-3 border-bottom border-secondary"
                          key={index}>
                          <div className="d-flex text-dark gap-3 justify-content-between">
                            <div className="d-flex gap-3">
                              <div className="cart-img-container">
                                <img src={order.product.imageUrl} alt={order.product.id} className="rounded-3" />
                              </div>
                              <div className="align-self-center">
                                <p className="mb-0 fw-bold">{order.product.title}</p>
                                <p className="mb-0">{`${order.product.price} / ${order.qty} ${order.product.unit}`}</p>
                              </div>

                            </div>
                            <div className="align-self-center">
                              <p className="mb-0 fw-bold">
                                小計: {order.final_total}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )
                  :
                  ('')
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}