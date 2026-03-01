export const MoodBox = () => {
  return (<>
    <section className="my-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="MoodBox sec_2_1 rounded-5 d-flex flex-column justify-content-center">
              <p className="fs-1 fw-bold text-secondary ps-5">
                {/* 在光影被記得之後 */}
                When light lingers in memory
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4 mt-4 mt-md-0 d-none d-md-block">
            <div className="MoodBox sec_2_img_2 rounded-5">
            </div>

          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-md-4 d-none d-md-block">
            <div className="MoodBox sec_2_img_3 rounded-5">
            </div>

          </div>
          <div className="col-12 col-md-8 mt-4 mt-md-0">
            <div className="MoodBox sec_2_img_4 rounded-5 d-flex flex-column justify-content-center">
              <p className="fs-1 fw-bold ps-5 text-secondary">
                {/* 情緒從此有了名字 */}
                Every mood acquires a name
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}