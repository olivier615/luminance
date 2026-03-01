import { FuzzyNight } from '../components/indexPage/FuzzyNight'

export const AboutUs = () => {
  return (<>
    <FuzzyNight />
    <div className="container my-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-lg-center">
        <div className="">
          <p className="text-primary fs-5 fw-bold mb-3">About Us</p>
          <p className="fw-bold text-dark fs-3 mb-0">關於我們</p>
          <p className="mt-2 fs-5 fw-bold">What is this Luminance?</p>
        </div>
        <blockquote className="blockquote">
          <p className='mb-0'>在光影被記得之後</p>
          <p className='mb-0'>情緒從此有了名字</p>
        </blockquote>
      </div>
      <div className="row">
        <div className="col-12 col-md-7 order-2 order-md-1">
          <div className="">
            <p className="p_align lh-lg">這不僅是一個關於照明的提問，更是一場對生活本質的深刻溯源。我們相信，光從來不只是為了驅散黑暗，它更像是一種無聲的語言，細膩地勾勒出居家空間的靈魂輪廓。在 Luminance 的美學世界裡，每一盞燈具都是對生活情緒的溫柔駐解。從「芬蘭距離」那份北歐式的冷靜留白，到「昭和浪漫」裡如琥珀般溫潤的舊時光，我們捕捉光影在不同維度下的性格，讓冰冷的建築線條在微光的浸潤下產生溫度。我們邀請每一位居住者重新審視與光的關係：當光影被記得之後，氛圍從此有了名字；而那道觸動你靈魂深處的光，正是我們不斷追尋的答案。</p>
            <p className="p_align lh-lg">我們對於光的執著，體現在對材質觸感與物理邏輯的極致追求中。在「E=MC²」的線性美學中，我們看見了數學比例交織出的理智力量；在「無聲奢華」的消光質地裡，我們體現了不言而喻的高級質感。Luminance 致力於打破傳統照明的邊界，利用壓花玻璃的折射、古銅金屬的沉穩以及高透光壓克力的輕盈，將抽象的能量轉化為具體的感官體驗。每一件作品都經過時間的洗鍊與工藝的雕琢，確保它在點亮的那一刻，不僅照亮了空間，更撐開了居住者對生活的自由想像。在這裡，光影是詩，是建築，更是你對理想生活最純粹的宣示，讓平凡的日常在流光溢彩中，昇華為永恆的藝廊。</p>
          </div>
        </div>
        <div className="col-12 col-md-5 order-1 order-md-2 mb-3 mb-md-0">
          <div className="img-container rounded-3">
            <img
              className="grayscale"
            src="https://images.unsplash.com/photo-1576525866307-0deeb39098a0?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

          </div>
        </div>
      </div>



    </div>
  </>)
}