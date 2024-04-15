import * as React from 'react'
import { useId, useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { usePolicyModal } from 'contexts/policy-modal-context'
import { useLanguage, useTranslation } from 'contexts/language-context';
import { useURL } from 'contexts/router-context';
import { Party } from 'types/schema';
import { HTMLContainer, RawHTML } from 'components/system/html';
import {
  Card,
  CardPrimaryContent,
  CardAside,
  CardBreadcrumb,
  CardHeading,
  HeadingLevel,
  CardLinkList
} from 'components/system/card';

//@ts-ignore
import { html as liberalPolicies2021 } from '../../policies/2021/lpc/*.md'
//@ts-ignore
import { html as ndpPolicies2021 } from '../../policies/2021/ndp/*.md'
//@ts-ignore
import { html as conservativePolicies2021 } from '../../policies/2021/cpc/*.md'
//@ts-ignore
import { html as liberalPolicies2015 } from '../../policies/2015/lpc_*.md'
//@ts-ignore
import { html as ndpPolicies2015 } from '../../policies/2015/ndp_*.md'
//@ts-ignore
import { html as conservativePolicies2015 } from '../../policies/2015/cpc_*.md'

const policies: ((year: number) => Record<keyof typeof Party, Record<string, string>>) = (year) => {
  switch (year) {
    case 2015: return {
      "Liberal": liberalPolicies2015,
      "NDP": ndpPolicies2015,
      "Conservative": conservativePolicies2015,
      "Green": {},
    }

    case 2021: return {
      "Liberal": liberalPolicies2021,
      "NDP": ndpPolicies2021,
      "Conservative": conservativePolicies2021,
      "Green": {},
    }

    default: return {
      "Liberal": {},
      "NDP": {},
      "Conservative": {},
      "Green": {},
    }
  }
}

interface SidebarLinkProps {
  url: string,
  heading: string,
  subheading: string,
}

// todo: custom border colour?
function SidebarLink ({ url, heading, subheading }: SidebarLinkProps) {
  return (
    <li className="sidebar-link">
      <a target="_blank" href={url}>
        <h2 className="sidebar-link--title"> {heading} </h2>
        <div className="sidebar-link--meta"> {subheading} </div>
      </a>
    </li>
  )
}

export default function PolicyModal () {
  const modalId = useId();
  const { modalPolicy, policyModalVisible } = usePolicyModal();
  const { setURL, setURLToPrevious } = useURL();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | undefined>(undefined);
  const [content, setContent] = React.useState<string>("");

  const closeModal = useCallback(() => {
    setURLToPrevious(() => {
      if (modalPolicy) {
        setURL({}, `/policies/${modalPolicy?.year}`, {event_name: "policy_modal_close"})
      } else {
        console.error("No policy to close");
      }
    });
  }, [modalPolicy]);

  useEffect(() => {
    const dialog = document.getElementById(modalId);
    setDialogElement(dialog as HTMLDialogElement);
  }, [modalId]);

  useEffect(() => {
    if (dialogElement) {
      if (modalPolicy) {
        dialogElement.showModal();
        document.body.classList.add('policyModal--open');
      } else {
        dialogElement.close();
        document.body.classList.remove('policyModal--open');
      }
    }
  }, [dialogElement, modalPolicy])

  useEffect(() => {
    const handler = (event: Event) => {
      closeModal();
    }
    if (dialogElement) {
      dialogElement?.addEventListener("cancel", handler);
      return (() => dialogElement?.removeEventListener("cancel", handler));
    }
  }, [dialogElement, closeModal]);

  useLayoutEffect(() => {
    let html = null;
    if (modalPolicy?.handle) {
      const handle = `${modalPolicy.handle}_${language}`;
      html = policies(modalPolicy.year)[modalPolicy.party][handle];
    }
    setContent(html || "")
  }, [modalPolicy, language]);

  if (!modalPolicy) {
    return (
      <dialog id={modalId} className="policyModal--content"/>
    );
  }

  if (content === "") {
    return (
      <dialog
      autoFocus={true}
      id={modalId}
      className={`policyModal--content policyReferenceModal--content policyModal--${modalPolicy.party} ${policyModalVisible ? "policyModal--visible" : ""}`}
      aria-labelledby="policyDialog__label"
      aria-describedby="policyDialog__description">
        <Card direction="column">
          <CardPrimaryContent compact={true}>
            <a href="#" className="modal--close reference-modal--close" aria-label="Close" onClick={e => { e.preventDefault(); closeModal(); return false;}} />
            <CardBreadcrumb text={t(`topic.${modalPolicy.topic}`) + "—" + t(modalPolicy.party.toLowerCase())} />
            <CardHeading level={HeadingLevel.H1} text={modalPolicy.title[language]} id="policyDialog__label" />
            <HTMLContainer id="policyDialog__description">
              <RawHTML html={content} />
            </HTMLContainer>
          </CardPrimaryContent>

          <CardAside title={t("modal.references")}>
            <CardLinkList links={modalPolicy.references.map(x => ({heading: x.title, subheading: x.publisher, ...x}))} />
          </CardAside>
        </Card>
      </dialog>
    )
  }


  return (
    <dialog
      autoFocus={true}
      id={modalId}
      className={`policyModal--content policyModal--${modalPolicy.party} ${policyModalVisible ? "policyModal--visible" : ""}`}
      aria-labelledby="policyDialog__label"
      aria-describedby="policyDialog__description">

      <Card direction="row">
        <CardPrimaryContent>
          <a href="#" className="modal--close" aria-label="Close" onClick={e => { e.preventDefault(); closeModal(); return false;}} />
          <CardBreadcrumb text={t(`topic.${modalPolicy.topic}`) + "—" + t(modalPolicy.party.toLowerCase())} />
          <CardHeading level={HeadingLevel.H1} text={modalPolicy.title[language]} id="policyDialog__label" />
          <HTMLContainer id="policyDialog__description">
            <RawHTML html={content} />
          </HTMLContainer>
        </CardPrimaryContent>

        <CardAside title={t("modal.references")}>
          <CardLinkList links={modalPolicy.references.map(x => ({heading: x.title, subheading: x.publisher, ...x}))} />
        </CardAside>
      </Card>
    </dialog>
  )
}