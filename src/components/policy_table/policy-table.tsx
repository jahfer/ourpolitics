import * as React from 'react'
import { useLanguage, useTranslation } from 'contexts/language-context'
import PolicyRow from './policy-row'
import TopicSelector from './topic-selector'
import { Party } from 'types/schema'
import * as Policy from 'data/policy'
import * as Util from 'support/util'
import { getItem, setItem } from 'data/storage'
import { useSettings } from 'contexts/settings-context'
import { Setting } from 'components/settings'
import SelectableList from 'components/system/selectable-list'

interface PolicyTableProps {
  dataset: Map<string, Array<Policy.T>>;
  parties: Set<Party>;
  year: string;
  enableTopicFilter: boolean;
  enableFloatingHeader: boolean;
  initialSelectedTopics?: Map<string, boolean>;
  hideHeader?: boolean;
}

const SELECTED_PARTIES = 'selectedParties';

const defaultNationalParties = new Set([Party.Conservative, Party.Liberal, Party.NDP]);

export default function PolicyTable ({ dataset, parties, year, enableTopicFilter, enableFloatingHeader, initialSelectedTopics, hideHeader = false }: PolicyTableProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [policyRows, setPolicyRows] = React.useState<Array<React.JSX.Element>>([]);

  const additionalPartiesSelectable = React.useMemo(() => parties.size > 3, [parties]);

  const shuffledParties = React.useMemo(() => {
    const p = getItem<Party[]>(SELECTED_PARTIES, () => {
      if (!additionalPartiesSelectable) {
        return Util.shuffle(Array.from(parties));
      }
      const [defaultParties, remainingParties] = Util.partition(Array.from(parties), party => defaultNationalParties.has(party));
      const remainingSlots = 3 - defaultParties.length;
      const filledParties = defaultParties.concat(remainingParties.slice(0, remainingSlots));
      return Util.shuffle(filledParties);
    }, 'session');

    setItem(SELECTED_PARTIES, p, 'session');
    return p.filter(party => parties.has(party));
  }, [parties, additionalPartiesSelectable]);

  const [selectedParties, setSelectedParties] = React.useState(shuffledParties);

  React.useMemo(() => {
    setSelectedParties(shuffledParties);
  }, [shuffledParties]);

  const topics = React.useMemo(() => Policy.topicsInDataset(dataset), [dataset]);
  const [topicSelections, setTopicSelections] = React.useState<Map<string, boolean>>(new Map());

  const setPartySelections = (selections: Map<Party, boolean>) => {
    const parties = Array.from(selections.entries()).filter(([_, selected]) => selected).map(([party, _]) => party)
    setSelectedParties(parties);
    setItem(SELECTED_PARTIES, parties, 'session');
  }

  const setAndPersistTopicSelections = (selections: Map<string, boolean>) => {
    setTopicSelections(selections);
    if (Array.from(selections.values()).every(value => value === true)) {
      Policy.resetSelectedTopics(year);
    } else {
      Policy.saveSelectedTopics(year, selections);
    }
  }

  React.useMemo(() => {
    const selectedTopics = initialSelectedTopics ? Array.from(initialSelectedTopics.keys()) : Policy.loadSelectedTopics(year);
    if (selectedTopics.length > 0) {
      setTopicSelections(new Map(topics.map((topic) => [topic, selectedTopics.includes(topic)])));
    } else {
      setTopicSelections(new Map(topics.map((topic) => [topic, true])));
    }
  }, [topics, year, initialSelectedTopics]);

  let elTop = 0;

  React.useEffect(() => {
    if (!enableFloatingHeader) return;

    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    let initialHeaderTop = $tableHeader.getBoundingClientRect().top;
    let initialBodyTop = document.body.getBoundingClientRect().top;
    elTop = initialHeaderTop - initialBodyTop;
  }, []);

  React.useEffect(() => {
    if (!enableFloatingHeader) return;

    let ignore = false;
    const $tableHeader = document.getElementById("tableHeader") as HTMLElement;
    const handler = () => {
      if (ignore) return;
      const $tableFiller = document.getElementById("tableFiller") as HTMLElement;
      window.requestAnimationFrame(() => {
        let scrollTop: number = document.documentElement.scrollTop;
        if (scrollTop > elTop) {
          $tableHeader.classList.add("fixed");
          $tableFiller.classList.remove("hidden");
        } else {
          $tableHeader.classList.remove("fixed");
          $tableFiller.classList.add("hidden");
        }
      });
    };

    window.addEventListener('scroll', handler);
    return () => {
      ignore = true;
      document.body.removeEventListener('scroll', handler);
    }
  }, [elTop]);

  React.useMemo(() => {
    let rows = Array.from(dataset.entries())
      .sort(([topicA], [topicB]) => topicA.localeCompare(topicB))
      .map(([topic, policies]) => {
        if (!topicSelections.get(topic)) {
          return null;
        } else {
          return (
            <PolicyRow
              topic={topic}
              year={year}
              parties={selectedParties}
              policies={policies}
              key={topic} 
              displayTopic={enableTopicFilter}/>
          )
        }
      });

    setPolicyRows(rows.filter(x => x) as Array<React.JSX.Element>);
  }, [selectedParties, dataset, topicSelections]);

  const topicTitle = t("topics") + (Array.from(topicSelections.values()).find(x => !x) === false ? "*" : "")

  const { registerSetting, unregisterSetting } = useSettings();

  React.useEffect(() => {
    const partySelections = new Map(Array.from(parties).map(party => [party, selectedParties.includes(party)]));

    registerSetting('partySelector',
      <Setting label={t("settings.policy_table.party_modal_selection_description")}>
        <SelectableList<Party>
          items={Array.from(parties)}
          className="list--dark flex flex-responsive flex-justify-around"
          selections={partySelections}
          onRender={(party) => t(party.toLowerCase())}
          onUpdate={(parties) => setPartySelections(parties)}
          enableToggleAll={false}
          enableToggleNone={false}
        />
      </Setting>, true /* fillSpace */
    );

    return () => {
      unregisterSetting('partySelector');
    };
  }, [language, parties, selectedParties]);

  return (
    <div className="policyTable">
      {
        !hideHeader && (
          <>
            <div id="tableHeader" className="policyRow container tableHeader flex flex-grow-0">
              <div className="policyCells">
                {
                  enableTopicFilter ?
                    (
                      <TopicSelector
                        key={`topicSelector--${topics}`}
                        id="policyTableColumn--topics" 
                        className="policyCell partyTitle backgroundColor--Empty"
                        title={topicTitle}
                        topics={topics}
                        selections={topicSelections}
                        onUpdate={(selections) => setAndPersistTopicSelections(selections)} />
                    ) : null
                }
                {
                  selectedParties.map((party) => {
                    return (
                      <div
                        key={`partyTitle--${party}`}
                        id={`policyTableColumn--${party}`}
                        className={`policyCell partyTitle backgroundColor--${party}`}>
                        {t(party.toLowerCase())}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div id="tableFiller" className="policyRow container tableFiller hidden"></div>
          </>
        )
      }
      {
        enableTopicFilter ?
        <TopicSelector
          key={`topicSelector--${topics}`}
          title={t("guide.whats_important_to_you")}
          topics={topics}
          selections={topicSelections}
          className="policyTable--mobileFilter"
          onUpdate={(selections) => setAndPersistTopicSelections(selections)} />
        : null
      }
      <div className="policyRows">
        {
          (policyRows.length == 0)
          ? <div className="policyTable--empty">{t("no_topics_selected")}</div>
          : policyRows
        }
      </div>
    </div>
  )
}