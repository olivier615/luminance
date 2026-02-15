import axios from "axios"
import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { PaginationList } from '../components/PaginationList'
import { apiPublicGetProducts } from '../apis/product'
import type {
  ProductData,
  TPagination
} from "../types/product"
// import type { ApiErrorResponse } from '../types/ApiErrorResponse'
// import { handleResponse } from '../utils/responseMessage'
import { BorderSpinner } from '../components/Spinner'
import { useMessage } from "../hooks/useMessage"


export const Products = () => {
  const { showError } = useMessage()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<ProductData[]>([])
  const [pagination, setPagination] = useState<TPagination>({
    total_pages: 1,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  })

  const getProducts = async (page: number = pagination.current_page, category: string = '') => {
    try {
      const response = await apiPublicGetProducts({
        page, category
      })
      setProducts(response.data.products)
      setPagination(response.data.pagination)
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

  const onChangePage = (page: number) => {
    setIsLoading(true)
    setPagination(prev => ({
      ...prev,
      current_page: page,
    }))
    getProducts(page)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className="container">
        <p className="text-center fs-3">商品列表</p>
        {
          isLoading ? (
            <BorderSpinner />
          ) : (
            <>
              <div className="row my-3">
                {
                  products.map(product => {
                    return (
                      <div className="col-12 col-sm-6 col-md-4" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    )
                  })
                }
              </div>
              <div className="d-flex justify-content-center">
                <PaginationList
                  pagination={pagination}
                  onChangePage={onChangePage}
                />
              </div>
            </>
          )
        }
      </div>
    </>
  )
}