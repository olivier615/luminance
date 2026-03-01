import { Link } from "react-router"

export const Footer = () => {
  return (
    <div className="bg-dark pt-5">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            <Link className="fw-bold navbar-brand fs-5 text-secondary" to="/">
              Luminance
            </Link>
            <p className="text-secondary small mt-3 mb-2">光，是空間的靈魂。</p>
            <p className="text-secondary small">
              Luminance 致力於捕捉極簡與溫暖間的平衡，我們精選每一盞燈具，只為在光影交錯間，為你的居家生活勾勒出最動人的氛圍與靈感。
            </p>
          </div>
          <div className="col-12 col-md-4 mt-5 mt-md-0">
            <div className="d-flex flex-column flex-lg-row gap-5 justify-content-between">
              <div className="d-flex flex-column gap-3 fw-bold">
                <Link to="/" className="text-decoration-none">購物說明</Link>
                <Link to="/" className="text-decoration-none">退換貨政策</Link>
                <Link to="/" className="text-decoration-none">追蹤訂單</Link>
                <Link to="/" className="text-decoration-none">聯繫我們</Link>
              </div>
              <div className="d-flex flex-column gap-3 fw-bold">
                <Link to="/" className="text-decoration-none">FaceBook</Link>
                <Link to="/" className="text-decoration-none">Instagram</Link>
                <Link to="/" className="text-decoration-none">Threads</Link>
              </div>
              <div className="">
                <div className="d-flex flex-column gap-3 fw-bold">
                  <Link to="/" className="text-decoration-none">隱私權</Link>
                  <Link to="/" className="text-decoration-none">使用條款</Link>
                  <Link to="/" className="text-decoration-none">Cookie</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-0 text-secondary text-center">© 2026 Luminance Inc.</p>
        </div>
      </div>
    </div>
  )
}