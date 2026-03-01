import axios from "axios"
import { Link } from "react-router"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { apiPublicGetProducts } from '../../apis/product'
import { useMessage } from "../../hooks/useMessage"
import type { ProductData } from "../../types/product"
import { BorderSpinner } from '../../components/Spinner'

export const PopularItems = () => {
  const { showError } = useMessage()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<ProductData[]>([])
  const getProducts = async (page: number = 1, category: string = '') => {
    try {
      const response = await apiPublicGetProducts({
        page, category
      })
      setProducts(response.data.products.sort(() => Math.random() - 0.5))
      setIsLoading(false)
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
    getProducts()
  }, [])

  return (
    <>
      <div className="container-fluid my-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="ps-5">
            <p className="text-primary fs-5 fw-bold mb-3">Spotlight</p>
            <p className="fw-bold text-dark fs-3 mb-5">精選商品</p>
          </div>
          <div className="pe-5">
            <Link to="/products" className="d-inline-block border-bottom border-primary text-decoration-none">
              查看全部商品
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
        {
          isLoading ?
            <BorderSpinner />
            :
            <Swiper
              slidesPerView={1.2}
              spaceBetween={20}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3.5,
                  spaceBetween: 30,
                },
              }}
              navigation
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="product-swiper"
            >
              {
                products.map(product => {
                  return (
                    <SwiperSlide key={product.id}>
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
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
        }
      </div>
    </>
  )
}