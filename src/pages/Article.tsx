import { useParams, useNavigate } from "react-router"
import collections from '../assets/content/styleBook.json'
import { PopularItems } from '../components/indexPage/PopularItems'

export const Article = () => {
  const navigate = useNavigate()
  const { id } = useParams<string>()
  const collection = collections[Number(id) - 1]
  return (
    <>
      <div className="container mt-3 mb-5">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm mb-3"
          onClick={() => navigate(-1)}
        >
          回上一頁
        </button>
        <div className="row">
          <div className="d-flex flex-column flex-sm-row justify-content-between mb-3 border-bottom border-secondary pb-2 px-2">
            <div className="">
              <p className="text-primary fs-5 fw-bold mb-2">{collection.englishTitle}</p>
              <p className="fw-bold text-dark fs-3 mb-0">{collection.title}</p>
            </div>
            <span className="align-self-end mt-1 mt-sm-0">{collection.subTitle}</span>
          </div>

          <div className="col-12 col-md-6 order-2 order-md-1">
            <div className="">
              <p className="lh-lg p_align px-29">{collection.article}</p>
            </div>

          </div>
          <div className="col-12 order-1 order-md-2 col-md-6 mb-3 mb-md-0">
            <div className="img-container">
              <img
                className="rounded-3"
                src={collection.imgUrl}
                alt={collection.title}
              />
            </div>
          </div>
        </div>
      </div>
      <PopularItems />
    </>
  )
}