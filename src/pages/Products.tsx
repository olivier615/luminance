import axios from "axios"
import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { PaginationList } from '../components/PaginationList'
import { apiPublicGetProducts } from '../apis/product'
import type {
  ProductData,
  TPagination
} from "../types/product"
import { BorderSpinner } from '../components/Spinner'
import { useMessage } from "../hooks/useMessage"


export const Products = () => {
  const { showError } = useMessage()
  const [search, setSearch] = useState('')
  const [ascending, setAscending] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<ProductData[]>([])
  const [pagination, setPagination] = useState<TPagination>({
    total_pages: 1,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  })

  const filteredProducts = useMemo(() => {
    const filter = [...products]
      .filter(product => product.title.match(search))
      if (ascending !== '0') {
        filter.sort((a, b) => {
          if (ascending === '1') {
            return a.price - b.price
          } else if (ascending === '2') {
            return b.price - a.price
          } else {
            return 0
          }
        })

      }
      return filter
  }, [search, ascending, products])

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
        <div className="text-center my-5">
          <p className="text-primary fs-5 fw-bold mb-3">Products</p>
          <p className="fw-bold text-dark fs-3 mb-5">全部商品</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 col-md-4 col-lg-2">
            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="輸入關鍵字搜尋"
                value={search}
                onChange={(event => setSearch(event.target.value))}
              />
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-2">
            <select className="form-select"
              value={ascending}
              onChange={(event => setAscending(event.target.value))}
            >
              <option value="" disabled>排序方式</option>
              <option value="1">價格：由低到高</option>
              <option value="2">價格：由高到低</option>
            </select>
          </div>
        </div>
        {
          isLoading ? (
            <BorderSpinner />
          ) : (
            <>
              <div className="row my-3">
                {
                  filteredProducts?.length === 0 ?
                    <p className="text-primary text-center fs-6 fw-bold mb-3">
                      Oops！沒有找到符合條件的商品 ：（
                    </p>
                    :
                    filteredProducts.map(product => {
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