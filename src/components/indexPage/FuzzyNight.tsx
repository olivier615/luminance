import { useState, useEffect, useMemo } from 'react'
import { fuzzyImages } from '../../assets/content/fuzzyImage'

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
};

export const FuzzyNight = () => {
  // 1. 準備原始隨機陣列
  const originalImages = useMemo(() => {
    return shuffleArray(fuzzyImages);
  }, []);

  // 2. 為了無縫捲動，渲染兩組一樣的內容
  const combinedImages = [...originalImages, ...originalImages]

  // 3. 呼吸感狀態：只需追蹤原始長度的狀態，兩組圖共用同一個狀態以達同步
  const [isGrayList, setIsGrayList] = useState<boolean[]>(
    new Array(originalImages.length).fill(true)
  )

  useEffect(() => {
    // 使用 ReturnType 確保跨環境相容性
    const timers: ReturnType<typeof setTimeout>[] = []

    originalImages.forEach((_, index) => {
      const toggle = () => {
        const delay = Math.floor(Math.random() * 2000) + 3000

        const timer = setTimeout(() => {
          setIsGrayList(prev => {
            const next = [...prev]
            next[index] = !next[index]
            return next
          })
          toggle() // 遞迴呼叫
        }, delay)

        timers.push(timer)
      }
      toggle()
    })

    // 清除所有定時器，避免組件卸載後的內存洩漏
    return () => timers.forEach(timer => clearTimeout(timer))
  }, [originalImages])

  return (
    <div className="film-strip-wrapper">
      <div className="film-track">
        {combinedImages.map((image, index) => {
          // 使用 % 運算子，讓第二組圖的呼吸節奏與第一組完全同步
          const stateIndex = index % originalImages.length

          return (
            <div className="film-item" key={index}>
              <img
                src={image}
                alt={`film-${index}`}
                className={isGrayList[stateIndex] ? 'grayscale' : 'ungrayscale'}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}