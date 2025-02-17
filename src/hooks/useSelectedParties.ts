import { useState, useCallback, useEffect } from 'react';
import { Party } from 'types/schema';
import { getItem, setItem } from 'data/storage';

const SELECTED_PARTIES = 'selectedParties';
const DEFAULT_PARTIES = new Set([Party.Conservative, Party.Liberal, Party.NDP]);

export function useSelectedParties(availableParties: Set<Party>, onChange?: () => void) {

  const getDefaultSelections = useCallback(() => {
    if (availableParties.size <= 3) {
      return Array.from(availableParties);
    }
    const [defaultParties, remainingParties] = Array.from(availableParties).reduce(
      ([def, rem], party) => 
        DEFAULT_PARTIES.has(party) ? [[...def, party], rem] : [def, [...rem, party]],
      [[] as Party[], [] as Party[]]
    );
    const remainingSlots = 3 - defaultParties.length;
    return [...defaultParties, ...remainingParties.slice(0, remainingSlots)];
  }, [availableParties]);

  const [selectedParties, setSelectedParties] = useState<Set<Party>>(new Set(getDefaultSelections()));

  const updateSelectedParties = useCallback((parties: Party[]) => {
    if (parties.length > 0) {
      setItem(SELECTED_PARTIES, parties, 'session');
    }
    const validParties = parties.filter(party => availableParties.has(party));
    setSelectedParties(new Set(validParties));
    onChange?.();
  }, [availableParties, onChange]);

  useEffect(() => {
    const parties = getItem<Party[]>(SELECTED_PARTIES, getDefaultSelections, 'session');
    updateSelectedParties(parties);
  }, [availableParties, getDefaultSelections, updateSelectedParties]);

  return {
    selectedParties,
    updateSelectedParties
  };
}
