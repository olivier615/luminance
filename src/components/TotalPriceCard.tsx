import { selectCart, selectCartQty } from '../slices/cartSlice'
import { useSelector } from 'react-redux'

export const TotalPriceCard = () => {
  const cart = useSelector(selectCart)
  const cartQty = useSelector(selectCartQty)
  const { total, final_total } = cart
  return (<div className="card py-4 px-3">
    <p className="mb-3 ">購物車金額</p>
    <div className="d-flex justify-content-between">
      <p>小計 <small>（{cartQty} 樣商品）</small></p>
      <p>{total}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p>折扣金額</p>
      <p>{total - final_total}</p>
    </div>
    <div className="d-flex justify-content-between">
      <p>總計</p>
      <p>{final_total}</p>
    </div>
  </div>)
}