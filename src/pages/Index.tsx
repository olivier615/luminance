import { Banner } from '../components/indexPage/Banner'
import { ServiceAssurance } from '../components/indexPage/ServiceAssurance'
import { StyleBook } from '../components/indexPage/StyleBook'
import { PopularItems } from '../components/indexPage/PopularItems'
import { Subscription } from '../components/indexPage/Subscription'
import { MoodBox } from '../components/indexPage/MoodBox'
import { useRef } from 'react'
import { FuzzyNight } from '../components/indexPage/FuzzyNight'

export const Index = () => {
  const styleBookRef = useRef<HTMLDivElement>(null)

  const scrollToStyleBook = () => {
    styleBookRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
  return (
    <>
      <Banner onScrollToStyle={scrollToStyleBook} />
      <FuzzyNight />
      <MoodBox />
      <PopularItems />
      <ServiceAssurance />
      <div ref={styleBookRef}>
        <StyleBook />
      </div>
      <Subscription />
    </>
  )
}