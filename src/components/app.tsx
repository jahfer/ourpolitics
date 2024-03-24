import * as React from 'react'

import ErrorIndex from 'components/pages/error-index'
import PolicyComparisonIndex from 'components/pages/policy-comparison-index'
import PrivacyPolicyIndex from 'components/pages/privacy-policy-index'
import AboutIndex from 'components/pages/about-index'
import TopicDetails from 'components/pages/topic-details'

import { LanguageProvider } from 'contexts/language-context'
import { RouterProvider, route } from 'contexts/router-context'

import { LanguageOption } from 'types/schema'
import Redirect from 'components/redirect'

const routes = [
  route("/", () =>
    <Redirect to="/policies/2021" />),

  route("/policies/:year", (year) =>
    <PolicyComparisonIndex year={year} />),

  route("/policies/:year/:party/:policyHandle", (year, party, policyHandle) =>
    <PolicyComparisonIndex year={year} party={party} policyHandle={policyHandle} />),

  route("/topics/:topic", (topic) =>
    <TopicDetails topic={topic} />),

  route("/about", () =>
    <AboutIndex />),

  route("/privacy", () =>
    <PrivacyPolicyIndex />),
]

export default function App () {
  return (
    <React.StrictMode>
      <LanguageProvider defaultLanguage={LanguageOption.EN}>
        <RouterProvider routes={routes} />
      </LanguageProvider>
    </React.StrictMode>
  )
}