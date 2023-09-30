import * as React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom'
import ErrorPage from './error-page'
import PolicyComparisonIndex from './policy-comparison-index'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
    // loader: () => redirect("/policies/2021"),
    children: [
      {
        path: "policies",
        element: <div>Policy</div>,
      },
      // {
      //   path: "policies/:year",
      //   element: <PolicyComparisonIndex />,
      // }
    ]
  },
]);

export default function App () {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}