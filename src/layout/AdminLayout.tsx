import { Outlet } from 'react-router'
import { AdminHeader } from '../components/admin/AdminHeader'
import { ScrollToTop } from "../components/ScrollToTop"

export default function AdminLayout() {
  return (
    <>
      <ScrollToTop />
      <AdminHeader />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}