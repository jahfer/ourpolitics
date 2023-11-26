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
import TopicDetails from 'components/pages/topic-details'

import { LanguageProvider } from 'contexts/language-context'
import { URLProvider, route } from 'contexts/router-context'

import { LanguageOption } from 'types/schema'
import Redirect from 'components/redirect'

const routes = [
  route("/", () => <Redirect to="/policies/2021" />),
  route("/policies/:year", (year) => <PolicyComparisonIndex />),
  route("/policies/:year/:party/:policyHandle", (year, party, policyHandle) => <PolicyComparisonIndex />),
  route("/topics/:topic", (topic) => <TopicDetails />),
  route("/about", () => <AboutIndex />),
  route("/privacy", () => <PrivacyPolicyIndex />),
]

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Redirect to="/policies/2021" />,
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
    path: "topics/:topic",
    element: <TopicDetails />,
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