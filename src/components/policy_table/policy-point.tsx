import * as React from 'react'
import { useLanguage } from 'contexts/language-context'
import { useURL } from 'contexts/router-context'
import * as Policy from 'data/policy'
import { Party, LanguageOption } from 'types/schema'
import { useAnalytics } from 'support/analytics'

interface PolicyPointProps {
  policy: Policy.T
}

function partyToAcronym(party: Party) {
  switch (party) {
    case Party.Conservative:
      return "CPC";
    case Party.Green:
      return "GPC";
    case Party.Liberal:
      return "LPC";
    case Party.NDP:
      return "NDP";
    default:
      const _exhaustiveCheck: never = party;
      return _exhaustiveCheck;
  }
}

const policyURL = (policy: Policy.T) =>
  `/policies/${policy.year}/${partyToAcronym(policy.party)}/${policy.handle}`;

export default function PolicyPoint ({ policy }: PolicyPointProps) {
  const { language } = useLanguage();
  const { setURL } = useURL();
  const _ = useAnalytics();

  let formattedPolicyTitle = policy.title[language].replace(
    /([$><+]*?[0-9]+\.?,?(&nbsp;)?[0-9-–]*\/?(%|\$|k|( ?(years?|days?|weeks?|hours?|billions?|millions?|milliards|tons?|dollars?|heures?))*))/g,
    "<span class='text-em'>$1</span>"
  );

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const analytics_title = `[${policy.party}] ${policy.title[LanguageOption.EN]}`;
    if (policy.handle) {
      setURL({ policy }, policyURL(policy), {event_name: analytics_title});
    } else {
      setURL({ policy }, undefined, {event_name: analytics_title});
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