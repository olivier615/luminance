import { NavLink } from "react-router"

export const AdminHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
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
                to="/admin"
                end
                // 父路由 NavLink 加 end
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary" : ""}`
                }
              >
                產品列表
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/admin/coupons"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary" : ""}`
                }
              >
                折價券列表
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary" : ""}`
                }
              >
                訂單列表
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
