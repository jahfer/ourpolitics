import * as React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  useLoaderData
} from 'react-router-dom'

import ErrorIndex from './pages/error-index'
import PolicyComparisonIndex from './pages/policy-comparison-index'
import PrivacyPolicyIndex from './pages/privacy-policy-index'
import AboutIndex from './pages/about-index'

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
    element: <AboutIndex />,
  },
  {
    path: "privacy",
    element: <PrivacyPolicyIndex />,
  }
]);

export default function App () {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}