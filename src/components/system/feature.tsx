import { ReactNode } from 'react';
import { isFeatureEnabled } from 'data/features';

interface FeatureProps {
  /** The name of the feature to check */
  name: string;
  /** Content to render if the feature is enabled */
  children: ReactNode;
  /** If true, render children when the feature is disabled */
  disabled?: boolean;
}

/**
 * Conditionally renders content based on feature flag state.
 * Features can be enabled/disabled via URL fragment using comma-separated values:
 * #feature:name:enable,feature:name2:disable
 *
 * Use two Feature components to handle both enabled and disabled states:
 *
 * <Feature name="new-design">
 *   <NewDesignComponent />
 * </Feature>
 * <Feature name="new-design" disabled>
 *   <OldDesignComponent />
 * </Feature>
 */
export function Feature({ name, children, disabled }: FeatureProps) {
  const isEnabled = isFeatureEnabled(name);

  if (disabled) {
    if (isEnabled) {
      return null;
    }
    return <>{children}</>;
  }

  if (!isEnabled) {
    return null;
  }

  return <>{children}</>;
}
