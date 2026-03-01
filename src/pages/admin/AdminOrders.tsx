import axios from "axios"
import dayjs from 'dayjs'
import { useEffect, useState } from "react"
import { useMessage } from "../../hooks/useMessage"
import { apiAdminGetOrders } from '../../apis/order'
import { PaginationList } from '../../components/PaginationList'
import { BorderSpinner } from '../../components/Spinner'
import { ConfirmDeleteOrder } from '../../components/admin/ConfirmDeleteOrder'
// import { CouponCard } from '../../components/CouponCard'
// import { TotalPriceCard } from '../../components/TotalPriceCard'
// import { MiniCartTable } from '../../components/MiniCartTable'
import type {
  TPagination,
} from "../../types/product"
import type { TOrder, TOrderInfo } from '../../types/order'

export const AdminOrders = () => {
  const { showError } = useMessage()
  const [orders, setOrders] = useState<TOrder[]>([])
  const [orderInfo, setOrderInfo] = useState<TOrderInfo[]>()
  const [pagination, setPagination] = useState<TPagination>({
    total_pages: 1,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // const [waiting, setWaiting] = useState<boolean>(false)

  const getOrders = async (page = '1') => {
    try {
      const response = await apiAdminGetOrders({ page })
      console.log(response.data)
      setOrders([...response.data.orders])
      setPagination({ ...response.data.pagination })
      setIsLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法取得訂單資料，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    }
  }

  const formatDate = (timestamp: number) => {
    const date = dayjs(timestamp * 1000).format('YYYY/MM/DD')
    return date
  }

  const getOrderData = (order: TOrder) => {
    const list: TOrderInfo[] = Object.values(order.products)
    setOrderInfo([...list])
  }

  const onChangePage = (page: number) => {
    setIsLoading(true)
    setPagination(prev => ({
      ...prev,
      current_page: page,
    }))
    getOrders(page.toString())
  }


  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <div className="container">
        <p className="fs-3 text-center">訂單列表</p>
        {
          isLoading ?
            (<BorderSpinner />)
            :
            (
              <>
                <div className="row">
                  <div className="col-8">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">訂單編號</th>
                          <th scope="col">建立日期</th>
                          <th scope="col">訂單金額</th>
                          <th scope="col">支付狀態</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orders.map((order, index) => {
                            return (
                              <tr key={order.id}>
                                <th scope="row">{index}</th>
                                <td>{order.id}</td>
                                <td>{formatDate(order.create_at)}</td>
                                <td>{order.total}</td>
                                <td>
                                  {
                                    order.is_paid
                                      ?
                                      (<span className="badge text-bg-primary text-light">已支付</span>)
                                      :
                                      (<span className="badge text-bg-danger text-light">未支付</span>)
                                  }
                                </td>
                                <td>
                                  <div className="btn-group">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => getOrderData(order)}
                                    >
                                      訂單內容
                                    </button>
                                    <ConfirmDeleteOrder
                                      orderId={order.id}
                                      onDeleted={getOrders}
                                    />
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                      <PaginationList
                        pagination={pagination}
                        onChangePage={onChangePage}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    {/* <CouponCard /> */}
                    {/* <TotalPriceCard /> */}
                    <p className="fw-bold text-dark fs-5 text-center my-3">訂單內容</p>
                    <div className="mt-3 md-mt-0 border border-secondary rounded-3 bg-light">
                      {
                        orderInfo ?
                          (
                            orderInfo.map((order, index) => {
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
              </>
            )
        }
      </div>
    </>
  )
}