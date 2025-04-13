import * as React from 'react'
import PolicyTable from './policy-table'
import { Party } from 'types/schema'
import { useURL } from 'contexts/router-context'
import * as Policy from 'data/policy'
import { useSettings } from 'contexts/settings-context'
import { useLanguage, useTranslation } from 'contexts/language-context'
import { Setting } from 'components/settings'
import SelectableList from 'components/system/selectable-list'
import { useSelectedParties } from 'hooks/useSelectedParties'
import { PolicyModalProvider } from 'contexts/policy-modal-context'

interface PolicyComparisonTableProps {
  year: string,
  selectedHandle?: string,
  canFilterTopics?: boolean,
  floatingHeader?: boolean,
  selectedTopics?: Array<string>,
  hideHeader?: boolean,
  renderEmpty?: () => React.ReactNode,
  onEmpty?: () => void,
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
    case Party.Bloc:
      return "BQ";
    default:
      const _exhaustiveCheck: never = party;
      return _exhaustiveCheck;
  }
}

export default function PolicyComparisonTable ({
  year,
  selectedHandle,
  selectedTopics,
  canFilterTopics = true,
  floatingHeader = true,
  hideHeader = false,
  renderEmpty,
  onEmpty,
}: PolicyComparisonTableProps) {
  const { t } = useTranslation();
  const { updateURLState } = useURL();
  const { registerSetting, unregisterSetting } = useSettings();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = React.useState(true);
  const [tableDataset, setTableDataset] = React.useState<Map<string, Array<Policy.T>>>();
  const [availableParties, setAvailableParties] = React.useState<Set<Party>>(new Set<Party>());
  const [policiesByHandle, setPoliciesByHandle] = React.useState<Map<string, Policy.T>>();
  const [activeTopics, setActiveTopics] = React.useState<Array<string>>(selectedTopics || []);

  React.useEffect(() => {
    if (selectedHandle && policiesByHandle) {
      const policy = policiesByHandle.get(selectedHandle);
      if (policy) {
        updateURLState({ policy });
      }
    }
  }, [selectedHandle, policiesByHandle]);

  React.useEffect(() => {
    let ignore = false;

    async function fetchPolicies() {
      const policies = await Policy.byYear(year);

      if (ignore) return;

      let parties = new Set<Party>();
      let policiesByHandle = new Map<string, Policy.T>();

      policies.forEach((policy) => {
        if (policy.handle || policy.id) {
          policiesByHandle.set(`${partyToAcronym(policy.party)}/${policy.handle || policy.id}`, policy);
        }

        parties.add(policy.party);
      });

      const dataset = Policy.toDataset(policies);

      setTableDataset(dataset);

      if (activeTopics.length === 0) {
        const selectedTopicsFromStorage = Policy.loadSelectedTopics(year)
        if (selectedTopicsFromStorage.length > 0) {
          setActiveTopics(selectedTopicsFromStorage);
        } else {
          setActiveTopics(Policy.topicsInDataset(dataset));
        }
      }

      setAvailableParties(parties);
      setPoliciesByHandle(policiesByHandle);
      setIsLoading(false);
    }

    fetchPolicies();
    return () => { ignore = true; };
  }, [year]);

  let availableTopics = null;
  if (tableDataset) {
    availableTopics = Policy.topicsInDataset(tableDataset);
  }
  
  const setAndPersistTopicSelections = React.useCallback((newSelections: Array<string>) => {
    if (!availableTopics) return;

    if (newSelections.length === availableTopics.length) {
      Policy.clearSelectedTopics(year);
      if (tableDataset) {
        setActiveTopics(Policy.topicsInDataset(tableDataset));
        return;
      }
    } else {
      Policy.saveSelectedTopics(year, newSelections);
    }

    setActiveTopics(newSelections);
  }, [year, availableTopics]);

  const { selectedParties, updateSelectedParties } = useSelectedParties(availableParties);

  const filteredTableDataset = React.useMemo(() => {
    if (!tableDataset) return;
    const filtered = Array.from(tableDataset.entries())
      .sort(([topicA], [topicB]) => topicA.localeCompare(topicB))
      .filter(([topic, _policies]) => activeTopics.indexOf(topic) >= 0);
    return new Map(filtered);
  }, [selectedParties, tableDataset, activeTopics]);

  React.useEffect(() => {
    const availablePartiesArray = Array.from(availableParties);
    const partySelections = new Map(availablePartiesArray.map(party => [party, selectedParties.has(party)]));

    registerSetting('partySelector', (notifySettingsUpdated) => (
      <Setting label={t("settings.policy_table.party_modal_selection_description")}>
        <SelectableList<Party>
          items={availablePartiesArray}
          className="list--dark flex flex-responsive flex-justify-around"
          selections={partySelections}
          onRender={(party: string) => t(party.toLowerCase())}
          onUpdate={(newPartySelections) => {
            const parties = Array
              .from(newPartySelections.entries())
              .filter(([_, selected]) => selected)
              .map(([party, _]) => party);
            updateSelectedParties(parties);
            notifySettingsUpdated({});
          }}
          enableToggleAll={false}
          enableToggleNone={false}
        />
      </Setting>
    ), true);

    // TODO: Subscribe to settings so that we pick up on
    // changes from other instances of this component

    return () => {
      unregisterSetting('partySelector');
    };
  }, [language, availableParties, selectedParties, updateSelectedParties]);

  let hasNoDataToRender = false;
  if (!isLoading && filteredTableDataset) {
    if (Array.from(filteredTableDataset.values()).every((policies) => policies.length === 0)) {
      hasNoDataToRender = true;
    }
  }

  React.useEffect(() => {
    if (hasNoDataToRender)  onEmpty?.();
  }, [hasNoDataToRender]);

  if (hasNoDataToRender && renderEmpty) {
    return renderEmpty();
  }

  return (
    <PolicyModalProvider>
      {
        (isLoading || !filteredTableDataset || !availableParties || !availableTopics) ?
        (
          <div className="policyCell partyTitle backgroundColor--Skeleton">
            ...
          </div>
        ) : <PolicyTable 
              dataset={filteredTableDataset}
              selectedParties={selectedParties}
              year={year}
              enableTopicFilter={canFilterTopics}
              enableFloatingHeader={floatingHeader}
              availableTopics={availableTopics}
              selectedTopics={activeTopics}
              onTopicSelectionsUpdate={setAndPersistTopicSelections}
              hideHeader={hideHeader}
            />
      }
    </PolicyModalProvider>
  )
}