import * as React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom'

import ErrorIndex from 'components/pages/error-index'
import PolicyComparisonIndex from 'components/pages/policy-comparison-index'
import PrivacyPolicyIndex from 'components/pages/privacy-policy-index'
import AboutIndex from 'components/pages/about-index'

import { LanguageProvider } from 'contexts/language-context'
import { URLProvider } from 'contexts/url-context'

import { LanguageOption } from 'types/schema'

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
    path: "policies/:year/:party/:policyHandle",
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
      <LanguageProvider defaultLanguage={LanguageOption.EN}>
        <URLProvider>
          <RouterProvider router={router} />
        </URLProvider>
      </LanguageProvider>
    </React.StrictMode>
  )
}