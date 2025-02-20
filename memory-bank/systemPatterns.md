# System Patterns

## Architecture Overview

The application is built as a modern single-page application (SPA) using:

- React for UI components
- TypeScript for type safety
- Vite as the build tool and development server

## Core Design Patterns

### Component Architecture

1. Page Components (`src/components/pages/`)

   - Top-level route components
   - Handle page-specific logic and layout
   - Examples: policy-index.tsx, policy-topic-details.tsx

2. Feature Components (`src/components/policy_table/`)

   - Reusable policy-related components
   - Handle specific feature logic
   - Examples: policy-comparison-table.tsx, policy-cell.tsx

3. System Components (`src/components/system/`)

   - Base UI components
   - Reusable across features
   - Examples: button.tsx, modal.tsx, icon.tsx, feature.tsx

### Context Management

Located in `src/contexts/`:

1. Language Context

   - Manages bilingual support (English/French)
   - Handles language switching
   - Provides translation utilities

2. Policy Modal Context

   - Controls policy detail modal state
   - Manages modal interactions

3. Router Context

   - Handles SPA routing
   - Manages navigation state

4. Selected Parties Context

   - Tracks selected political parties
   - Manages comparison state

5. Settings Context
   - Manages user preferences
   - Handles persistent settings

### Data Management

1. Policy Data (`src/data/`)

   - Policy type definitions
   - Data storage utilities
   - Policy parsing and processing

2. Policy Content (`src/policies/`)
   - Markdown files for policy content
   - Organized by year and party
   - Bilingual content support (_.en.md/_.fr.md)

### Styling Architecture

Located in `src/styles/`:

1. Base Styles

   - Typography
   - Variables
   - Layout fundamentals

2. Component Styles
   - Modular CSS files
   - Component-specific styling
   - Responsive design patterns

### Support Utilities

Located in `src/support/`:

1. Analytics

   - Usage tracking
   - Performance monitoring

2. Translations

   - Translation string management
   - Language utilities

3. General Utilities
   - Helper functions
   - Common operations

### Feature Toggles

1.  Feature Component (`src/components/system/feature.tsx`)

    - Conditionally renders content based on feature flag state.
    - Features can be enabled/disabled via URL fragment using comma-separated values: `#feature:name:enable,feature:name2:disable`
    - Use two Feature components to handle both enabled and disabled states:

    ```tsx
    <Feature name="new-design">
      <NewDesignComponent />
    </Feature>
    <Feature name="new-design" disabled>
      <OldDesignComponent />
    </Feature>
    ```

2.  Feature Management (`src/data/features.ts`)
    - Stores all feature flags in a single JSON blob in storage
    - Parses URL fragments to enable/disable features
    - Provides helper functions to get/set feature states
