import collections from '../../assets/content/styleBook.json'
import { Link } from "react-router"

export const StyleBook = () => {
  return (
    <section>
      <div className="container-fluid my-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-lg-center">
          <div className="ps-5">
            <p className="text-primary fs-5 fw-bold mb-3">Vibe & Inspiration</p>
            <p className="fw-bold text-dark fs-3 mb-5">氛圍與靈感</p>
          </div>
          <div className="ps-5 ps-lg-0 pe-lg-5">
            <p>在光影交錯間，發現純粹的力量。<br /> Luminance 以洗鍊線條與冷色調美學，重新定義家具與照明的當代輪廓。</p>
          </div>
        </div>
        <div className="row">
          {
            collections.map(collection => {
              return (
                <div className="col-12 col-md-6 col-lg-3 mb-4 grayscale_card" key={collection.id}>
                  <div className="card">
                    <img
                      src={collection.imgUrl}
                      className="card-img grayscale" alt={collection.title} />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-0">
                      <div className="blur_card p-3 rounded-bottom">
                        <h5 className="card-title mb-3 text-secondary">{collection.title}</h5>
                        <p className="card-text p_align">{collection.desc}</p>
                        <div className="d-flex justify-content-end">
                          <Link
                            to={`/article/${collection.id}`}
                            className="card-text d-inline-block border-bottom border-primary text-decoration-none"
                          >
                            <small>
                              探索更多
                            </small>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}