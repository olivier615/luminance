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
  const originalImages = useMemo(() => {
    return shuffleArray(fuzzyImages);
  }, []);

  const combinedImages = [...originalImages, ...originalImages]
  const [isGrayList, setIsGrayList] = useState<boolean[]>(
    new Array(originalImages.length).fill(true)
  )

  useEffect(() => {
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
          toggle()
        }, delay)

        timers.push(timer)
      }
      toggle()
    })

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [originalImages])

  return (
    <div className="film-strip-wrapper">
      <div className="film-track">
        {combinedImages.map((image, index) => {
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