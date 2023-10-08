import * as React from 'react'
import { useId, useEffect, useState, useLayoutEffect } from 'react'
import { usePolicyModal, usePolicyModalVisiblity } from '../context/policy-modal-context'
import { useLanguage } from '../context/language-context';
import { Party, Reference } from '../../types/schema';

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

interface ReferenceProps {
  source: Reference,
}

function Reference ({ source }: ReferenceProps) {
  return (
    <li className="reference">
      <a target="_blank" href={source.url}>
        <h2 className="reference--title"> {source.title} </h2>
      </a>
      <div className="reference--meta"> {source.publisher} </div>
    </li>
  )
}

export default function PolicyModal () {
  const modalId = useId();
  const { modalPolicy } = usePolicyModal();
  const { policyModalVisible, setPolicyModalVisibility } = usePolicyModalVisiblity();
  const { language } = useLanguage();
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | undefined>(undefined);
  const [content, setContent] = React.useState<string>("");

  useEffect(() => {
    const dialog = document.getElementById(modalId);

    if (dialog) {
      if (modalPolicy && policyModalVisible) {
        (dialog as HTMLDialogElement).showModal();
        document.body.classList.add('policyModal--open');
      } else {
        // Best practice states that when a modal dialog is closed,
        // focus should go back the element that opened it.
        (dialog as HTMLDialogElement).close();
        document.body.classList.remove('policyModal--open');
      }

      setDialogElement(dialog as HTMLDialogElement);
    }
  }, [modalId, modalPolicy, policyModalVisible]);

  const closeModalHandler = (event: any) => {
    setPolicyModalVisibility(false);
    event.preventDefault();
    return false
  }

  useEffect(() => {
    if (dialogElement) {
      dialogElement.addEventListener("close", closeModalHandler);
    }
  }, [dialogElement]);

  useLayoutEffect(() => {
    console.log(language);
    let html = null;
    if (modalPolicy?.handle) {
      const handle = `${modalPolicy.handle}_${language}`;
      switch (modalPolicy.party) {
        case Party.Liberal:
          html = liberalPolicies2021[handle];
          break;
        case Party.Conservative:
          html = conservativePolicies2021[handle];
          break;
        case Party.NDP:
          html = ndpPolicies2021[handle];
          break;
        case Party.Green:
          html = "";
          break;
      }
    }
    setContent(html)
  }, [modalPolicy, language]);

  if (!modalPolicy) {
    return (
      <dialog id={modalId} className="policyModal--content"/>
    );
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
          <a href="#" className="modal--close" aria-label="Close" onClick={closeModalHandler} />
          <div className="modal--headingContainer">
            <div className="modal--headingInfo">
              <div className="modal--topicBox"> <p> {modalPolicy.topic} </p> </div>
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
          <h2 className="modal--heading modal--heading__secondary"> References </h2>
          <ul className="reference--list">
            {(modalPolicy.references.map(ref => <Reference key={ref.url} source={ref} />)) }
          </ul>
          <div className="modal--randomize">
            <a className="randomize-policy iconSuffix iconSuffix--random" onClick={e => e.preventDefault() }>
              Random policy
            </a>
          </div>
        </aside>
      </div>
    </dialog>
  )
}