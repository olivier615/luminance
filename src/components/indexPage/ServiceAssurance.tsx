export const ServiceAssurance = () => {
  const services = [
    { title: "免費到府安裝", desc: "專業團隊到府，為您精準定位每一道光。", icon: "bi-tools" },
    { title: "30 天無條件退費", desc: "讓您在真實的生活場景中，安心感受光影變化。", icon: "bi-emoji-smile-fill" },
    { title: "裝潢風格諮詢", desc: "預約專業設計顧問，打造專屬的極簡生活美學。", icon: "bi-chat-left-text-fill" }
  ];

  return (
    <section className="service-assurance-section py-5 border-bottom">
      <div className="container ">
        <div className="row">
          {services.map((s, idx) => (
            <div key={idx} className="col-12 col-md-4 text-center">
              <div className="my-3">
                <i className={`bi fs-3 text-dark ${s.icon}`}></i>
              </div>
              <h5 className="fw-bold text-dark">{s.title}</h5>
              <p className="text-muted small px-lg-4">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};