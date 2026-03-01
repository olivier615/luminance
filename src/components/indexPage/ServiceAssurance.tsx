export const ServiceAssurance = () => {
  const services = [
    { title: "免費到府安裝", desc: "專業團隊到府，為您精準定位每一道光。", icon: "bi-tools" },
    { title: "30 天無條件退費", desc: "讓您在真實的生活場景中，安心感受光影變化。", icon: "bi-emoji-smile-fill" },
    { title: "裝潢風格諮詢", desc: "預約專業設計顧問，打造專屬的極簡生活美學。", icon: "bi-chat-left-text-fill" }
  ];

  return (
    <section className="service-assurance-section py-5 border-bottom">
      <div className="container">
        <div className="row">
          {services.map((s, idx) => (
            <div key={idx} className="col-12 mb-3 mb-md-0 col-md-4 d-flex align-items-center gap-3">
              <div className="">
                <i className={`bi fs-3 text-primary ${s.icon}`}></i>
              </div>
              <div className="d-flex flex-column gap-1">
                <h5 className="fw-bold text-dark mb-0">{s.title}</h5>
                <p className="text-muted small mb-0">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};