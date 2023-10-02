import * as React from 'react'
import { useId, useEffect, useState } from 'react'
import { usePolicyModal, usePolicyModalVisiblity } from '../context/policy-modal-context'
import { useLanguage } from '../context/language-context';

import { html as AboutEN } from '../pages/content/about_index.en.md'

export default function PolicyModal () {
  const modalId = useId();
  const { modalPolicy } = usePolicyModal();
  const { policyModalVisible, setPolicyModalVisibility } = usePolicyModalVisiblity();
  const language = useLanguage();
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement | undefined>(undefined);
  const [content, setContent] = React.useState<string>("");

  // TODO
  // Use specific modal state bool, since clicking same
  // policy twice will not re-open the modal
  useEffect(() => {
    let dialog = document.getElementById(modalId);

    if (dialog) {
      if (modalPolicy && policyModalVisible) {
        (dialog as HTMLDialogElement).showModal();
      } else {
        // Best practice states that when a modal dialog is closed,
        // focus should go back the element that opened it.
        (dialog as HTMLDialogElement).close();
      }

      setDialogElement(dialog as HTMLDialogElement);
    }
  }, [modalId, modalPolicy, policyModalVisible]);

  useEffect(() => {
    if (dialogElement) {
      dialogElement.addEventListener("close", (event) => {
        setPolicyModalVisibility(false);
      });
    }
  }, [dialogElement]);

  useEffect(() => {
    if (modalPolicy) {
      const text = AboutEN;
      setContent(text);
    }
  }, [modalPolicy]);

  if (!modalPolicy) {
    return (
      <dialog id={modalId} className="policyModal--content">
      </dialog>
    );
  }

  return (
    <dialog
      id={modalId}
      className={`policyModal--content policyModal--${modalPolicy.party} ${policyModalVisible ? "policyModal--visible" : ""}`}
      aria-labelledby="policyDialog__label"
      aria-describedby="policyDialog__description">
      <div className="policyModal">
        <div className="modal--content">
          <a href="#" className="modal--close" aria-label="Close" onClick={(e) => setPolicyModalVisibility(false) } />
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
            {/* {(modalPolicy.references.map(ref => <Reference key={ref.url} source={ref} />)) } */}
          </ul>
          <div className="modal--randomize">
            <a className="randomize-policy iconSuffix iconSuffix--random" href="javascript:void(0)">
              Random policy
            </a>
          </div>
        </aside>
      </div>
    </dialog>
  )
}