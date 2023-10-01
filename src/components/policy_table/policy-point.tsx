import * as React from 'react'
import { useLanguage } from '../context/language-context'
import { Language, Policy } from '../../types/schema'

interface PolicyPointProps {
  policy: Policy
}

export default function PolicyPoint ({ policy }: PolicyPointProps) {
  const language = useLanguage();
  let formattedPolicyTitle = policy.title[Language.EN].replace(
    /([$><+]*?[0-9]+\.?,?(&nbsp;)?[0-9-–]*\/?(%|\$|k|( ?(years?|days?|weeks?|hours?|billions?|millions?|milliards|tons?|dollars?|heure?))*))/g,
    "<span class='text-em'>$1</span>"
  );

  return (
    <li className={policy.handle ? "policyPoint iconSuffix iconSuffix--comment" : "policyPoint"}>
      <a
        className="policyPoint--link"
        href={"#"}
        dangerouslySetInnerHTML={{ __html: formattedPolicyTitle }} />
    </li>
  )
}