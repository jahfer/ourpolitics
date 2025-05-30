import * as React from 'react'
import { useLayoutEffect, useCallback } from 'react'
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
import { Modal } from 'components/system/modal';

// 2025
//@ts-ignore
import { html as policies2025 } from 'virtual:mddir:../../policies/2025/*'

// 2021
//@ts-ignore
import { html as liberalPolicies2021 } from 'virtual:mddir:../../policies/2021/lpc/*'
//@ts-ignore
import { html as ndpPolicies2021 } from 'virtual:mddir:../../policies/2021/ndp/*'
//@ts-ignore
import { html as conservativePolicies2021 } from 'virtual:mddir:../../policies/2021/cpc/*'

// 2015
//@ts-ignore
import { html as liberalPolicies2015 } from 'virtual:mddir:../../policies/2015/lpc_*'
//@ts-ignore
import { html as ndpPolicies2015 } from 'virtual:mddir:../../policies/2015/ndp_*'
//@ts-ignore
import { html as conservativePolicies2015 } from 'virtual:mddir:../../policies/2015/cpc_*'

const policies: ((year: number) => Record<keyof typeof Party, Record<string, string>>) = (year) => {
  switch (year) {
    case 2025: return {
      [Party.Liberal]: policies2025,
      [Party.NDP]: policies2025,
      [Party.Conservative]: policies2025,
      [Party.Green]: policies2025,
      [Party.Bloc]: policies2025,
    }

    case 2021: return {
      [Party.Liberal]: liberalPolicies2021,
      [Party.NDP]: ndpPolicies2021,
      [Party.Conservative]: conservativePolicies2021,
      [Party.Green]: {},
      [Party.Bloc]: {},
    }

    case 2015: return {
      [Party.Liberal]: liberalPolicies2015,
      [Party.NDP]: ndpPolicies2015,
      [Party.Conservative]: conservativePolicies2015,
      [Party.Green]: {},
      [Party.Bloc]: {},
    }

    default: return {
      [Party.Liberal]: {},
      [Party.NDP]: {},
      [Party.Conservative]: {},
      [Party.Green]: {},
      [Party.Bloc]: {},
    }
  }
}

export default function PolicyModal () {
  const { modalPolicy, policyModalVisible } = usePolicyModal();
  const { setURL, setURLToPrevious } = useURL();
  const { language } = useLanguage();
  const { t } = useTranslation();
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

  useLayoutEffect(() => {
    let html = null;
    if (modalPolicy?.handle || modalPolicy?.id) {
      const handle = `mddir_${modalPolicy.handle ? modalPolicy.handle : modalPolicy.id}_${language}`;
      html = policies(modalPolicy.year)[modalPolicy.party][handle];
    }
    setContent(html || "")
  }, [modalPolicy, language]);

  if (!modalPolicy) {
    return (
      <Modal open={policyModalVisible} onClose={closeModal} />
    );
  }

  let dialogClass = `policyModal--${modalPolicy.party} ${policyModalVisible ? "policyModal--visible" : ""}`;
  let modalCloseClass = "modal--close";

  if (content === "") {
    dialogClass += " policyReferenceModal--content"
    modalCloseClass += " reference-modal--close"
  } else {
    modalCloseClass += " on-dark-bg"
  }

  return (
    <Modal
      className={dialogClass}
      titleElementId="policyDialog__label"
      descriptionElementId="policyDialog__description"
      open={!!modalPolicy}
      onClose={closeModal}
      useCustomCloseButton={true}>
      <Card direction={content === "" ? "column" : "row"}>
        <CardPrimaryContent compact={!content}>
          <a href="#" className={modalCloseClass} aria-label="Close" onClick={e => { e.preventDefault(); closeModal(); return false;}} />
          <CardBreadcrumb text={t(`topic.${modalPolicy.topic}`) + "—" + t(modalPolicy.party.toLowerCase())} />
          <CardHeading level={HeadingLevel.H1} text={modalPolicy.title[language]} id="policyDialog__label" />
          <div className="card--description">
            <HTMLContainer id="policyDialog__description">
              <RawHTML html={content} />
            </HTMLContainer>
          </div>
        </CardPrimaryContent>

        <CardAside title={t("modal.references")}>
          <CardLinkList links={modalPolicy.references.map(x => ({heading: x.title, subheading: x.publisher, ...x}))} />
        </CardAside>
      </Card>
    </Modal>
  )
}