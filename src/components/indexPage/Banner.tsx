import { Link } from "react-router"

type BannerProps = {
  onScrollToStyle: () => void
}

export const Banner = ({ onScrollToStyle }: BannerProps) => {
  return (
    <>
      <section className="banner_view banner_bg w-100 mt-0">
        <div className="container">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-12 col-md-6">
              <div className="blur_card p-5 rounded-5 mt_title_card">
                <div className="">
                  <div className="index_view_title">
                    <p>Find</p>
                    <p className="text-md-end">Your</p>
                    <p>Mood</p>
                  </div>
                  <p className="mt-3">每一盞燈具都是對生活的溫柔註解。<br />精選極簡美學設計，為你的居家空間構築光影與靈感的交界。</p>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <Link to={'/products'} className="btn btn-primary w-100">
                    開始選購
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={onScrollToStyle}
                  >
                    風格導覽
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}