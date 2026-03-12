import Layout from '../layout/Layout';
import AdminLayout from '../layout/AdminLayout';

import ProtectedRoute from '../components/ProtectedRoute'

import { Index } from '../pages/Index'
import { Products } from '../pages/Products'
import { Product } from '../pages/Product'
import { Cart } from '../pages/Cart'
import { NotFound } from '../pages/NotFound'
import { Login } from '../pages/Login'
import { AdminProducts } from '../pages/admin/AdminProducts'
import { AdminOrders } from '../pages/admin/AdminOrders'
import { CreateOrder } from '../pages/CreateOrder'
import { Payment } from '../pages/Payment'
import { Article } from '../pages/Article'
import { AboutUs } from '../pages/AboutUs'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'about',
        element: <AboutUs />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'product/:id',
        element: <Product />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'create_order',
        element: <CreateOrder />
      },
      {
        path: 'payment/:id',
        element: <Payment />
      },
      {
        path: 'article/:id',
        element: <Article />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminProducts />
      },
      {
        path: 'orders',
        element: <AdminOrders />
      }
    ]
  }
]

export default routes;
