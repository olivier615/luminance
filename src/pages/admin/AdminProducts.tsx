import { useEffect, useState, useRef } from "react"
import axios from "axios"
import * as bootstrap from 'bootstrap'
import { apiGetProducts } from "../../apis/product"
import { ProductModal } from '../../components/admin/ProductModal'
import { ConfirmDeleteModel } from '../../components/admin/ConfirmDeleteModel'
import { PaginationList } from '../../components/PaginationList'
import { BorderSpinner } from '../../components/Spinner'
import type {
  ProductData,
  TPagination,
  InstallationType
} from "../../types/product"
import { useMessage } from "../../hooks/useMessage"

export const AdminProducts = () => {
  const { showSuccess, showError } = useMessage()
  const productModalRef = useRef<bootstrap.Modal | null>(null)
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [productEditState, setProductEditState] = useState<'new' | 'edit'>('new')
  const [tempProduct, setTempProduct] = useState<ProductData | null>(null)
  const [pagination, setPagination] = useState<TPagination>({
    total_pages: 1,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  })
  const getProducts = async (page: number = pagination.current_page, category: string = '') => {
    setIsLoading(true)
    try {
      const response = await apiGetProducts({ page, category })
      setProducts(response.data.products)
      setPagination(response.data.pagination)
      showSuccess('取得資料成功')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || '取得資料失敗'
        showError(message)
      } else {
        showError('發生未知錯誤')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onChangePage = (page: number) => {
    setPagination(prev => ({
      ...prev,
      current_page: page,
    }))
    getProducts(page)
  }


  const openProductModal = async (mode: 'new' | 'edit', product: ProductData | null) => {
    setProductEditState(mode)
    if (mode === 'edit') setTempProduct(product)
    productModalRef.current?.show()
  }

  const closeModal = async () => {
    productModalRef.current?.hide()
  }

  const installationLabelMap: Record<InstallationType, string> = {
    none: '無須安裝',
    negotiable: '需議價',
    free: '免費安裝',
  }

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ReactToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
    axios.defaults.headers.common.Authorization = token;
    getProducts()
    const el = document.getElementById('productModal')
    if (!el) return
    productModalRef.current = new bootstrap.Modal('#productModal', {
      keyboard: false
    })
    const handleHide = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }

    el.addEventListener('hide.bs.modal', handleHide)
    return () => {
      el.removeEventListener('hide.bs.modal', handleHide)
      productModalRef.current?.dispose()
      productModalRef.current = null
    }
  }, [])
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <p className="fs-3 text-center">產品列表</p>
          {
            isLoading ?
              ((<BorderSpinner />))
              :
              (<>
                <div className="text-end">
                  <button onClick={() => openProductModal('new', null)} type="button" className="btn btn-primary ">新增產品</button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>產品名稱</th>
                      <th>分類</th>
                      <th>原價</th>
                      <th>售價</th>
                      <th>到府安裝</th>
                      <th>是否啟用</th>
                      <th>編輯</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.title}</td>
                          <td>{product.category}</td>
                          <td>{product.origin_price}</td>
                          <td>{product.price}</td>
                          <td className={`${product.installation ? '' : 'text-danger'}`}>
                            {product.installation
                              ? installationLabelMap[product.installation]
                              : '未啟用'}
                          </td>
                          <td className={`${product.is_enabled ? '' : 'text-danger'}`}>
                            {product.is_enabled ? "啟用" : "未啟用"}
                          </td>
                          <td>
                            <div className="btn-group">
                              <button
                                type="button" className="btn btn-outline-primary btn-sm"
                                onClick={() => openProductModal('edit', product)}
                              >
                                編輯
                              </button>
                              <ConfirmDeleteModel
                                productId={product.id}
                                productTitle={product.title}
                                onDeleted={getProducts}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>尚無產品資料</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>)
          }
        </div>
      </div>
      {
        isLoading ?
          ('')
          :
          (<PaginationList
            pagination={pagination}
            onChangePage={onChangePage}
          />)
      }
      <ProductModal
        closeModal={closeModal}
        productEditState={productEditState}
        tempProduct={tempProduct}
        onEdited={getProducts}
      />
    </div>)
}