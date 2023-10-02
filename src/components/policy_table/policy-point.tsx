import * as React from 'react'
import { useLanguage } from '../context/language-context'
import { usePolicyModal, usePolicyModalVisiblity } from '../context/policy-modal-context'
import { LanguageOption, Policy } from '../../types/schema'

interface PolicyPointProps {
  policy: Policy
}

export default function PolicyPoint ({ policy }: PolicyPointProps) {
  const language = useLanguage();
  const { modalPolicy, setModalPolicy } = usePolicyModal();
  const { setPolicyModalVisibility } = usePolicyModalVisiblity();
  let formattedPolicyTitle = policy.title[LanguageOption.EN].replace(
    /([$><+]*?[0-9]+\.?,?(&nbsp;)?[0-9-–]*\/?(%|\$|k|( ?(years?|days?|weeks?|hours?|billions?|millions?|milliards|tons?|dollars?|heure?))*))/g,
    "<span class='text-em'>$1</span>"
  );

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setModalPolicy(policy);
    setPolicyModalVisibility(true);
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