import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import * as Policy from 'data/policy';
import PolicyModal from 'components/policy_table/policy-modal';
import { useURL } from 'contexts/router-context';

interface PolicyModalProviderProps {
  children: React.ReactNode;
}

type PolicyModalContextType = {
  modalPolicy: Policy.T | null,
  policyModalVisible: boolean,
}

export const PolicyModalContext = createContext<PolicyModalContextType>({
  modalPolicy: null,
  policyModalVisible: false,
});

export function usePolicyModal() {
  return useContext(PolicyModalContext);
}

export function PolicyModalProvider({ children }: PolicyModalProviderProps) {
  const { history } = useURL();

  const [modalPolicy, setModalPolicy] = useState<Policy.T | null>(() => null);
  const [policyModalVisible, setPolicyModalVisibility] = useState(!!modalPolicy);
  const policyModalValue = { modalPolicy, policyModalVisible };

  React.useEffect(() => {
    const currentState = history[0]?.state;
    if (currentState && "policy" in currentState && currentState.policy) {
      setModalPolicy(currentState.policy as Policy.T);
      setPolicyModalVisibility(true);
    } else {
      setModalPolicy(null);
      setPolicyModalVisibility(false);
    }
  }, [history]);

  return (
    <PolicyModalContext.Provider value={policyModalValue}>
      <PolicyModal />
      {children}
    </PolicyModalContext.Provider>
  );
}