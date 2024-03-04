import * as React from 'react'
import { useId, useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { usePolicyModal } from 'contexts/policy-modal-context'
import { useLanguage, useTranslation } from 'contexts/language-context';
import { useURL } from 'contexts/router-context';
import * as Policy from 'data/policy';
import { Party } from 'types/schema';

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

interface ReferenceProps {
  source: Policy.ReferenceType,
}

function Reference ({ source }: ReferenceProps) {
  return (
    <li className="reference">
      <a target="_blank" href={source.url}>
        <h2 className="reference--title"> {source.title} </h2>
        <div className="reference--meta"> {source.publisher} </div>
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
        setURL({}, `/policies/${modalPolicy?.year}`)
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
        <div className="policyModal policyModal--reference">
          <div className="modal--content reference-modal--content">
            <a href="#" className="modal--close reference-modal--close" aria-label="Close" onClick={e => { e.preventDefault(); closeModal(); return false;}} />
            <div className="modal--headingContainer">
              <div className="modal--headingInfo">
                <div className="modal--topicBox"> <p> {t(`topic.${modalPolicy.topic}`)} — {t(modalPolicy.party.toLowerCase())} </p> </div>
              </div>
            </div>
            <h1
              className="modal--heading modal--heading__primary"
              dangerouslySetInnerHTML={{ __html: modalPolicy.title[language] }}
            />
          </div>

          <aside className="modal--sidebar">
            <h2 className="modal--heading modal--heading__secondary"> {t("modal.references")} </h2>
            <ul className="reference--list list-plain">
              {(modalPolicy.references.map(ref => <Reference key={ref.url} source={ref} />)) }
            </ul>
          </aside>
        </div>
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
      <div className="policyModal">

        <div className="modal--content">
          <a href="#" className="modal--close" aria-label="Close" onClick={e => { e.preventDefault(); closeModal(); return false;}} />
          <div className="modal--headingContainer">
            <div className="modal--headingInfo">
              <div className="modal--topicBox"> <p> {t(`topic.${modalPolicy.topic}`)} — {t(modalPolicy.party.toLowerCase())} </p> </div>
            </div>
          </div>
          <h1
            className="modal--heading modal--heading__primary"
            dangerouslySetInnerHTML={{ __html: modalPolicy.title[language] }}
            id="policyDialog__label"
          />
          <div id="policyDialog__description" className="modal--details">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>

        <aside className="modal--sidebar">
          <h2 className="modal--heading modal--heading__secondary"> {t("modal.references")} </h2>
          <ul className="reference--list">
            {(modalPolicy.references.map(ref => <Reference key={ref.url} source={ref} />)) }
          </ul>
          {/* <div className="modal--randomize">
            <a href="#" className="randomize-policy iconSuffix iconSuffix--random" onClick={e => e.preventDefault() }>
              {t("modal.random_policy")}
            </a>
          </div> */}
        </aside>
      </div>
    </dialog>
  )
}