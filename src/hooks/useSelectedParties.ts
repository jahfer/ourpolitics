import { useEffect } from 'react';
import { Party } from 'types/schema';
import { useSelectedPartiesContext } from 'contexts/selected-parties-context';

export function useSelectedParties(availableParties: Set<Party>, onChange?: () => void) {
  const { selectedParties, updateSelectedParties, setAvailableParties } = useSelectedPartiesContext();

  useEffect(() => {
    setAvailableParties(availableParties);
  }, [availableParties, setAvailableParties]);

  useEffect(() => {
    onChange?.();
  }, [selectedParties, onChange]);

  return {
    selectedParties,
    updateSelectedParties
  };
}
