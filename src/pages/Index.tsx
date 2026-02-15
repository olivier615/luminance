import { Banner } from '../components/indexPage/Banner'
import { ServiceAssurance } from '../components/indexPage/ServiceAssurance'
import { StyleBook } from '../components/indexPage/StyleBook'
import { PopularItems } from '../components/indexPage/PopularItems'
import { Subscription } from '../components/indexPage/Subscription'
import { MoodBox } from '../components/indexPage/MoodBox'

export const Index = () => {
  return (
    <>
      <Banner />
      <ServiceAssurance />
      <PopularItems />
      <MoodBox />
      <StyleBook />
      <Subscription />
    </>
  )
}