import { Outlet } from 'react-router'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ScrollToTop } from "../components/ScrollToTop"

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}