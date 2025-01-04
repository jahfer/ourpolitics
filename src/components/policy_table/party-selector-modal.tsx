import * as React from 'react'
import { useTranslation } from 'contexts/language-context'
import { Party } from 'types/schema'
import { Modal } from 'components/system/modal'
import SelectableList from 'components/system/selectable-list'
import {
  Card,
  CardPrimaryContent,
  CardHeading,
  CardBody,
  HeadingLevel,
} from 'components/system/card'

interface PartySelectorModalProps {
  visible: boolean
  onClose: () => void
  parties: Set<Party>
  selectedParties: Party[],
  onUpdate: (selections: Map<Party, boolean>) => void,
}

export function PartySelectorModal({ visible, onClose, parties, selectedParties, onUpdate }: PartySelectorModalProps) {
  const { t } = useTranslation();
  const partySelections = new Map(Array.from(parties).map(party => [party, selectedParties.includes(party)]));

  return (
    <Modal open={visible} className="policyReferenceModal--content" onClose={onClose}>
      <Card direction="column">
        <CardPrimaryContent compact={true}>
          <CardHeading level={HeadingLevel.H1} text={t("policy_table.political_parties")} />
          <CardBody>
            <p>{t("policy_table.party_modal_selection_description")}</p>
            <SelectableList<Party>
              items={Array.from(parties)}
              selections={partySelections}
              onRender={(party) => t(party.toLowerCase())}
              onUpdate={onUpdate}
              enableToggleAll={false}
              enableToggleNone={false}
            />
          </CardBody>
        </CardPrimaryContent>
      </Card>
    </Modal>
  )
}