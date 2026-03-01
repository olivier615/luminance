import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import type { ProductData } from "../types/product"
import { apiPublicGetProduct } from "../apis/product"
import { apiPublicAddCartItem } from "../apis/cart"
import { QuantityControl } from "../components/QuantityControl"
import { useMessage } from "../hooks/useMessage"
import { GrowingSpinnerButton } from '../components/Spinner'
import { getAsyncCarts } from '../slices/cartSlice'
import { useAppDispatch } from '../store/hooks'
import { PopularItems } from '../components/indexPage/PopularItems'

export const Product = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showSuccess, showError } = useMessage()
  const { id } = useParams<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)
  const [product, setProduct] = useState<ProductData>({
    category: "",
    content: "",
    description: "",
    id: "",
    imageUrl: "",
    imagesUrl: [],
    is_enabled: 0,
    num: 0,
    origin_price: 0,
    price: 0,
    title: "",
    unit: "",
    installation: "none",
  })

  const addToCart = async () => {
    if (typeof id !== 'string') return
    setIsLoading(true)
    try {
      const response = await apiPublicAddCartItem({ product_id: id, qty: quantity })
      dispatch(getAsyncCarts())
      showSuccess(response.data.message)
      setQuantity(1)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法加入購物車，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const decreaseQuantity = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const getProduct = async (id: string) => {
    try {
      const response = await apiPublicGetProduct(id)
      setProduct(response.data.product)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '無法取得產品資料，請稍後再試'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    }
  }

  useEffect(() => {
    getProduct(id as string)
  }, [])

  return (
    <>
      <div className="container my-5">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm mb-2"
          onClick={() => navigate(-1)}
        >回上一頁</button>
        <div className="mt-2 mb-3">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="img-container mb-3">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    className="img-fluid rounded"
                    alt={product.title}
                  />
                )}
              </div>
              <div className="row g-2">
                {
                  product.imagesUrl.length > 0 ?
                    product.imagesUrl.map(url => {
                      return (
                        <div className="col-3" key={url}>
                          <div className="img-container">
                            <img className="img-fluid rounded" src={url} alt={url} />
                          </div>
                        </div>
                      )
                    })
                    : ''
                }
              </div>
            </div>
            <div className="offset-0 offset-md-1 col-md-5">
              <div className="">
                <h5 className="text-dark fs- fw-bold">{product.title}</h5>
                <p className="mb-1">{product.category}</p>
                <p className="">{product.content}</p>
              </div>

              <hr />
              <div className="d-flex flex-column align-items-end">
                <p className="">
                  <small className="text-body-secondary">
                    {product.description}
                  </small>
                </p>
                <p>原價：
                  <del className="text-body-secondary">
                    {product.origin_price}
                  </del>
                </p>
                <p>售價：{`${product.price} / ${product.unit}`}</p>
                <div className="d-flex gap-3">
                  <p className="fs-5 mb-0 align-self-center">購買數量</p>
                  <QuantityControl
                    waiting={false}
                    quantity={quantity}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    justifyStart={false}
                  />
                  {
                    isLoading ?
                      (<GrowingSpinnerButton />)
                      :
                      <button className="btn btn-outline-primary"
                        onClick={addToCart}
                      >加入購物車</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <PopularItems />
    </>
  )
}
