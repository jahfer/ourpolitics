import * as React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom'
import ErrorIndex from './pages/error-index'

import PolicyComparisonIndex from './pages/policy-comparison-index'
import PrivacyPolicyIndex from './pages/privacy-policy-index'
import AboutIndex from './pages/about-index'

import Header from './header';
import Footer from './footer';

const router = createBrowserRouter([
  {
    path: "/",
    loader: (_) => redirect("/policies/2021"),
    errorElement: <ErrorIndex />,
  },
  {
    path: "policies/:year",
    element: <PolicyComparisonIndex />,
  },
  {
    path: "about",
    element: <AboutIndex />
  },
  {
    path: "privacy",
    element: <PrivacyPolicyIndex />
  }
]);

export default function App () {
  return (
    <React.StrictMode>
      <div className="page">
        <Header />
        <div className="container">
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>
    </React.StrictMode>
  )
}