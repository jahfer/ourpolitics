import * as React from 'react'
import { useLanguage } from 'contexts/language-context'
import { useURL } from 'contexts/router-context'
import * as Policy from 'data/policy'
import { LanguageOption } from 'types/schema'
import { useAnalytics } from 'support/analytics'

interface PolicyPointProps {
  policy: Policy.T
}

const policyURL = (policy: Policy.T) =>
  `/policies/${policy.year}/${Policy.partyToAcronym(policy.party)}/${policy.handle || policy.id}`;

export default function PolicyPoint ({ policy }: PolicyPointProps) {
  const { language } = useLanguage();
  const { setURL } = useURL();
  const _ = useAnalytics();

  let formattedPolicyTitle = policy.title[language].replace(
    /(([$><+]*|Bill |loi |F-)?[0-9]+\.?,?[ \u00A0]?[0-9-–]*(%|[ \u00A0]?\$|k|)?\/?(( ?(hours?|days?|weeks?|months?|years?|billions?|millions?|milliards?|tons?|dollars?|heures?|jours?|semaines?|mois|ans?|tonnes?))(?!\w))?)/g,
    "<span class='text-em'>$1</span>"
  );

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const event_name = `policy_${policy.year}_${policy.topic}_${policy.party}_${policy.id || policy.handle || policy.title[LanguageOption.EN]}`;
    if (policy.id || policy.handle) {
      setURL({ policy }, policyURL(policy), {event_name});
    } else {
      setURL({ policy }, undefined, {event_name});
    }

    event.preventDefault();
    return false;
  }

  return (
    <li className={policy.handle ? "policyPoint iconSuffix iconSuffix--comment" : "policyPoint"}>
      <a
        className="policyPoint--link"
        href={"#"}
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: formattedPolicyTitle }} />
    </li>
  )
}