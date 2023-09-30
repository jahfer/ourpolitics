import * as React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom'
import ErrorPage from './error-page'
import PolicyComparisonIndex from './pages/policy-comparison-index'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "policies/:year",
    element: <PolicyComparisonIndex />,
  }
]);

export default function App () {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}