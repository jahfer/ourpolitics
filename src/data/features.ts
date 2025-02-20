import { getItem, setItem } from 'data/storage';

const FEATURES_STORAGE_KEY = 'features';

// Type for the features blob stored in storage
interface Features {
  [key: string]: boolean;
}

/**
 * Get all feature flags from storage
 */
export function getFeatures(): Features {
  return getItem<Features>(FEATURES_STORAGE_KEY, {});
}

/**
 * Get the state of a specific feature
 */
export function isFeatureEnabled(name: string): boolean {
  const features = getFeatures();
  return features[name] ?? false;
}

/**
 * Set the state of a specific feature
 */
export function setFeature(name: string, enabled: boolean): void {
  const features = getFeatures();
  features[name] = enabled;
  setItem(FEATURES_STORAGE_KEY, features);
}

/**
 * Parse URL fragment and update feature flags
 * Format: #feature:name:enable|disable,feature:name2:enable|disable
 * Example: #feature:new-design:enable,feature:beta:disable
 */
export function parseFeatureFlags(): void {
  const fragment = window.location.hash;
  if (!fragment) return;

  const features = getFeatures();
  const featureStrings = fragment.slice(1).split(','); // Remove leading # and split by comma

  for (const featureString of featureStrings) {
    const match = featureString.match(/^feature:([^:]+):(enable|disable)$/);
    if (match) {
      const [, name, state] = match;
      features[name] = state === 'enable';
    }
  }

  setItem(FEATURES_STORAGE_KEY, features);
}

// Parse feature flags from URL fragment on load
if (typeof window !== 'undefined') {
  parseFeatureFlags();
  
  // Update features when hash changes
  window.addEventListener('hashchange', parseFeatureFlags);
}
