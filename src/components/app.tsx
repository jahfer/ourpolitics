import * as React from 'react'

import PolicyComparisonIndex from 'components/pages/policy-comparison-index'
import PrivacyPolicyIndex from 'components/pages/privacy-policy-index'
import AboutIndex from 'components/pages/about-index'
import TopicDetails from 'components/pages/topic-details'
import GuidedPolicyIndex from 'components/pages/guided-policy-index'

import { LanguageProvider } from 'contexts/language-context'
import { RouterProvider, route } from 'contexts/router-context'
import { SettingsProvider } from 'contexts/settings-context'

import { LanguageOption } from 'types/schema'
import Redirect from 'components/redirect'
import { useAnalytics } from 'support/analytics'
import { getItem } from 'data/storage'

const routes = [
  route("/", () => {
    console.log("has visited guide", getItem("has-visited-guide", false));
    if (getItem("has-visited-guide", false)) {
      return <Redirect to="/policies/2021" />
    }

    return <Redirect to="/guide" />
  }),

  route("/policies/:year", (year) =>
    <PolicyComparisonIndex year={year} />),

  route("/policies/:year/topics/:topic", (year, topic) =>
    <TopicDetails year={year} topic={topic} />),

  route("/policies/:year/:party/:policyHandle", (year, party, policyHandle) =>
    <PolicyComparisonIndex year={year} party={party} policyHandle={policyHandle} />),

  route("/guide", () => <GuidedPolicyIndex year="2021" />),

  route("/about", () =>
    <AboutIndex />),

  route("/privacy", () =>
    <PrivacyPolicyIndex />),
]

export default function App () {
  const _ = useAnalytics();

  return (
    <React.StrictMode>
      <LanguageProvider defaultLanguage={LanguageOption.EN}>
        <SettingsProvider>
          <RouterProvider routes={routes} />
        </SettingsProvider>
      </LanguageProvider>
    </React.StrictMode>
  )
}