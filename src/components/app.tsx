import * as React from 'react'

import PolicyIndex from 'components/pages/policy-index'
import PrivacyPolicyIndex from 'components/pages/privacy-policy-index'
import AboutIndex from 'components/pages/about-index'
import PolicyTopicDetails from 'components/pages/policy-topic-details'
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
    if (getItem("has-visited-guide", false)) {
      return <Redirect to="/policies/2021" />
    }

    return <Redirect to="/guide" />
  }),

  route("/policies/:year", (year) =>
    <PolicyIndex year={year} />),

  route("/policies/:year/topics/:topic", (year, topic) =>
    <PolicyTopicDetails year={year} topic={topic} />),

  route("/policies/:year/:party/:policyHandle", (year, party, policyHandle) =>
    <PolicyIndex year={year} party={party} policyHandle={policyHandle} />),

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