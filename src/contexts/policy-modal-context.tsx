import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Policy } from 'types/schema';
import PolicyModal from 'components/policy_table/policy-modal';
import { useURL } from 'contexts/url-context';

interface PolicyModalProviderProps {
  children: React.ReactNode;
}

type PolicyModalContextType = {
  modalPolicy?: Policy
  setModalPolicy: (policy: Policy) => void
}

export const PolicyModalContext = createContext<PolicyModalContextType>({
  setModalPolicy: () => {}
});

export function usePolicyModal() {
  return useContext(PolicyModalContext);
}

type PolicyModalVisibilityContextType = {
  policyModalVisible: boolean,
  setPolicyModalVisibility: (visible: boolean) => void
}

export const PolicyModalVisibilityContext = createContext<PolicyModalVisibilityContextType>({
  policyModalVisible: false,
  setPolicyModalVisibility: () => {}
});

export function usePolicyModalVisiblity() {
  return useContext(PolicyModalVisibilityContext);
}

export function PolicyModalProvider({ children }: PolicyModalProviderProps) {
  const { historyState } = useURL();

  const [modalPolicy, setModalPolicy] = useState<Policy>();
  const policyModalValue = { modalPolicy, setModalPolicy };

  const [policyModalVisible, setPolicyModalVisibility] = useState("policy" in historyState && historyState.policy);
  const policyModalVisibilityValue = { policyModalVisible, setPolicyModalVisibility };

  React.useEffect(() => {
    if ("policy" in historyState && historyState.policy) {
      setModalPolicy(historyState.policy as Policy);
      setPolicyModalVisibility(true);
    } else {
      setPolicyModalVisibility(false);
    }
  }, [historyState]);

  return (
    <PolicyModalContext.Provider value={policyModalValue}>
      <PolicyModalVisibilityContext.Provider value={policyModalVisibilityValue}>
        <PolicyModal />
        {children}
      </PolicyModalVisibilityContext.Provider>
    </PolicyModalContext.Provider>
  );
}