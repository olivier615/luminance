import { useEffect, useState } from "react"
import axios from "axios"
import type {
  ProductData,
  CreateProductParams,
  InstallationType
} from "../../types/product"

import {
  apiCreateProduct,
  apiEditProduct
} from "../../apis/product"

import { useMessage } from "../../hooks/useMessage"
import { handleResponse } from '../../utils/responseMessage'
import { ImageInput } from './ImageInput'
import { ImageCard } from './ImageCard'

const installationOptions: {
  label: string,
  value: InstallationType
}[] = [
  { label: '無', value: 'none' },
  { label: '需議價', value: 'negotiable' },
  { label: '免費安裝', value: 'free' },
]

const initialEditProduct: CreateProductParams = {
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '',
  description: '',
  content: '',
  is_enabled: 1,
  imageUrl: '',
  imagesUrl: [],
  installation: 'none'
}

type ProductModalProps = {
  closeModal: () => void,
  productEditState: 'new' | 'edit',
  tempProduct: ProductData | null,
  onEdited: () => void
}

export const ProductModal = ({ closeModal, productEditState, tempProduct, onEdited }: ProductModalProps) => {
  const { showSuccess, showError } = useMessage()
  const [imageUrlInput, setImageUrlInput] = useState<string>('')
  const [editProduct, setEditProduct] = useState<CreateProductParams>(initialEditProduct)

  const handleModalInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target
    setEditProduct((prevData) => ({
      ...prevData,
      [id]: id === 'origin_price' || id === 'price' ? Number(value) : value
    }))
  }

  const handleIsEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditProduct((prev) => ({
      ...prev,
      is_enabled: event.target.checked ? 1 : 0
    }))
  }

  const handleInstallation = (value: InstallationType) => {
    setEditProduct((prev) => ({
      ...prev,
      installation: value
    }))
  }

  const isURL = (url: string): boolean => {
    const httpsOnlyRegex = /^https:\/\//i
    return httpsOnlyRegex.test(url)
  }

  const addNewUrl = () => {
    if (imageUrlInput === '') return
    if (!isURL(imageUrlInput)) {
      handleResponse('錯誤的 Url', 'warning')
    } else {
      setEditProduct((prev) => ({
        ...prev,
        imagesUrl: [...prev.imagesUrl, imageUrlInput],
        imageUrl: prev.imageUrl === '' ? imageUrlInput : prev.imageUrl
      }))
      setImageUrlInput('')
    }
  }

  const deleteUrl = (index: number) => {
    setEditProduct((prevData) => {
      const newImagesUrl = prevData.imagesUrl.filter((_, i) => i !== index)
      return {
        ...prevData,
        imagesUrl: newImagesUrl,
        imageUrl: prevData.imagesUrl[index] === prevData.imageUrl 
          ? (newImagesUrl.length > 0 ? newImagesUrl[0] : '') 
          : prevData.imageUrl,
      }
    })
  }

  const setMainImage = (index: number) => {
    setEditProduct((prev) => ({
      ...prev,
      imageUrl: prev.imagesUrl[index]
    }))
  }

  const onUploaded = (url: string) => {
    setImageUrlInput(url)
    setEditProduct(prev => ({
      ...prev,
      imageUrl: prev.imageUrl === '' ? url : prev.imageUrl
    }))
  }

  const handelAddNewProduct = async () => {
    try {
      const response = await apiCreateProduct(editProduct)
      setEditProduct(initialEditProduct)
      showSuccess(response.data.message)
      closeModal()
      onEdited()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data?.message || '新增產品失敗')
      } else {
        showError('發生未知錯誤')
      }
    }
  }


  const handleEditProduct = async () => {
    if (!tempProduct?.id) return
    try {
      const response = await apiEditProduct({
        id: tempProduct.id,
        data: editProduct
      })
      showSuccess(response.data.message)
      closeModal()
      onEdited()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data?.message || '編輯產品失敗')
      } else {
        showError('發生未知錯誤')
      }
    }
  }

  const handelModalSubmit = () => {
    if (productEditState === 'new') {
      handelAddNewProduct()
    } else {
      handleEditProduct()
    }
  }

  useEffect(() => {
    if (productEditState === 'edit' && tempProduct) {
      setEditProduct({ // eslint-disable-line
        title: tempProduct.title,
        category: tempProduct.category,
        origin_price: tempProduct.origin_price,
        price: tempProduct.price,
        unit: tempProduct.unit,
        description: tempProduct.description,
        content: tempProduct.content,
        is_enabled: tempProduct.is_enabled,
        imageUrl: tempProduct.imageUrl,
        imagesUrl: tempProduct.imagesUrl ?? [],
        installation: tempProduct.installation
      })
    } else {
      setEditProduct(initialEditProduct)
    }
  }, [productEditState, tempProduct])

  useEffect(() => {
  const modal = document.getElementById('productModal')

  const handler = () => {
    setEditProduct(initialEditProduct)
    setImageUrlInput('')
  }

  modal?.addEventListener('hidden.bs.modal', handler)

  return () => {
    modal?.removeEventListener('hidden.bs.modal', handler)
  }
}, [])

useEffect(() => {
  const modal = document.getElementById('productModal')

  const handleHidden = () => {
    setEditProduct(initialEditProduct)
    setImageUrlInput('')
  }

  const handleShow = () => {
    if (productEditState === 'edit' && tempProduct) {
      setEditProduct({
        title: tempProduct.title,
        category: tempProduct.category,
        origin_price: tempProduct.origin_price,
        price: tempProduct.price,
        unit: tempProduct.unit,
        description: tempProduct.description,
        content: tempProduct.content,
        is_enabled: tempProduct.is_enabled,
        imageUrl: tempProduct.imageUrl,
        imagesUrl: tempProduct.imagesUrl ?? [],
        installation: tempProduct.installation
      })
    } else {
      setEditProduct(initialEditProduct)
    }
  }

  modal?.addEventListener('hidden.bs.modal', handleHidden)
  modal?.addEventListener('show.bs.modal', handleShow)

  return () => {
    modal?.removeEventListener('hidden.bs.modal', handleHidden)
    modal?.removeEventListener('show.bs.modal', handleShow)
  }
}, [productEditState, tempProduct])


  return (
    <div id="productModal" className="modal fade" tabIndex={-1} aria-labelledby="productModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content border-0">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">
              <span>{productEditState === 'new' ? '新增產品' : '編輯產品'}</span>
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="mb-2">
                  <ImageInput onUploaded={onUploaded} />
                  <label htmlFor="imageUrlInput" className="form-label mt-2">輸入圖片網址</label>
                  <input
                    id="imageUrlInput"
                    type="text"
                    className="form-control"
                    placeholder="請輸入圖片連結"
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    value={imageUrlInput}
                  />
                </div>
                <button className="btn btn-outline-primary btn-sm d-block w-100 mb-3" onClick={addNewUrl}>
                  新增圖片
                </button>
                {editProduct.imagesUrl.map((url, index) => (
                  <ImageCard
                    key={`${index}-${url}`}
                    url={url}
                    onDelete={() => deleteUrl(index)}
                    onSetMainImage={() => setMainImage(index)}
                  />
                ))}
              </div>

              {/* 右側表單內容 */}
              <div className="col-sm-8">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">標題</label>
                  <input id="title" type="text" className="form-control" placeholder="請輸入標題" onChange={handleModalInputChange} value={editProduct.title} />
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="category" className="form-label">分類</label>
                    <input id="category" type="text" className="form-control" placeholder="請輸入分類" onChange={handleModalInputChange} value={editProduct.category} />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="unit" className="form-label">單位</label>
                    <input id="unit" type="text" className="form-control" placeholder="請輸入單位" onChange={handleModalInputChange} value={editProduct.unit} />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="origin_price" className="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" className="form-control" placeholder="請輸入原價" onChange={handleModalInputChange} value={editProduct.origin_price} />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="price" className="form-label">售價</label>
                    <input id="price" type="number" min="0" className="form-control" placeholder="請輸入售價" onChange={handleModalInputChange} value={editProduct.price} />
                  </div>
                </div>
                <div className="mb-3">
                  <p className="mb-2">到府安裝</p>
                  {installationOptions.map(option => (
                    <div className="form-check form-check-inline" key={option.value}>
                      <input
                        id={`install-${option.value}`}
                        className="form-check-input"
                        type="radio"
                        name="installation"
                        checked={editProduct.installation === option.value}
                        onChange={() => handleInstallation(option.value)}
                      />
                      <label className="form-check-label" htmlFor={`install-${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">產品描述</label>
                  <textarea id="description" className="form-control" rows={3} placeholder="請輸入產品描述" onChange={handleModalInputChange} value={editProduct.description}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">說明內容</label>
                  <textarea id="content" className="form-control" rows={3} placeholder="請輸入說明內容" onChange={handleModalInputChange} value={editProduct.content}></textarea>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input id="is_enabled" className="form-check-input" type="checkbox" onChange={handleIsEnabled} checked={editProduct.is_enabled === 1} />
                    <label className="form-check-label" htmlFor="is_enabled">是否啟用</label>
                  </div>
                </div>
                <div className="mb-3 card p-3 w-50 bg-light">
                  <p className="fw-bold">主要圖片預覽</p>
                  {editProduct.imageUrl ? (
                    <img className="img-fluid rounded border" src={editProduct.imageUrl} alt="Main" />
                  ) : (
                    <div className="text-muted small text-center py-4">尚未設定主要圖片</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button onClick={handelModalSubmit} type="button" className="btn btn-primary px-4">確認</button>
          </div>
        </div>
      </div>
    </div>
  )
}