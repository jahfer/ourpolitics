import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Policy } from '../../types/schema';
import PolicyModal from '../policy_table/policy-modal';

interface PolicyModalProviderProps {
  policy?: Policy,
  visible: boolean,
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

export function PolicyModalProvider({ children, visible = false }: PolicyModalProviderProps) {
  const [modalPolicy, setModalPolicy] = useState<Policy>();
  const policyModalValue = { modalPolicy, setModalPolicy };

  const [policyModalVisible, setPolicyModalVisibility] = useState(visible);
  const policyModalVisibilityValue = { policyModalVisible, setPolicyModalVisibility };

  return (
    <PolicyModalContext.Provider value={policyModalValue}>
      <PolicyModalVisibilityContext.Provider value={policyModalVisibilityValue}>
        <PolicyModal />
        {children}
      </PolicyModalVisibilityContext.Provider>
    </PolicyModalContext.Provider>
  );
}