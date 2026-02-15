import { NavLink } from "react-router"
import { useEffect } from 'react'
import { getAsyncCarts } from '../slices/cartSlice'
import { useAppDispatch } from '../store/hooks'
import { selectCartQty } from '../slices/cartSlice'
import { useSelector } from 'react-redux'


export const Header = () => {
  const cartQty = useSelector(selectCartQty)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAsyncCarts())
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <NavLink className="navbar-brand text-dark fw-bold" to="/">
          Luminance
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary" : ""} text-center`
                }
              >
                首頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary" : ""} text-center`
                }
              >
                查看商品
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link position-relative ${isActive ? "text-primary" : ""} text-center`
                }
              >
                <i className="bi bi-cart fs-5"></i>

                {cartQty > 0 && (
                  <span
                    className="position-absolute translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.65rem' }}
                  >
                    {cartQty}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
