# Technical Context

## Development Environment

### Core Technologies

1. Framework

   - React 18
   - TypeScript
   - Vite (Build tool and dev server)

2. Language Support
   - TypeScript for type safety
   - ES Modules (type: "module")

### Key Dependencies

1. React Ecosystem

   - react: ^18.2.0
   - react-dom: ^18.2.0
   - @types/react: ^18.2.23
   - @types/react-dom: ^18.2.8

2. Build Tools

   - vite: ^5.2.10
   - @vitejs/plugin-react: ^4.2.1
   - esbuild: ^0.19.4
   - terser: ^5.31.3 (minification)

3. Content Processing

   - react-remark: ^2.1.0 (Markdown processing)
   - unplugin-markdown-2-html: ^0.3.4
   - fast-glob: ^3.3.1 (File system operations)

4. Utilities
   - lodash-es: ^4.17.21
   - vite-tsconfig-paths: ^4.3.2

## Development Scripts

1. Local Development

   ```bash
   npm run serve     # Starts dev server on 0.0.0.0
   ```

2. Build & Preview

   ```bash
   npm run build     # Production build
   npm run preview   # Preview build on port 8080
   ```

3. Utilities
   ```bash
   npm run generate-sitemap  # Generate site map
   ```

## Technical Constraints

1. Browser Support

   - Modern browsers (ES Modules support required)
   - No IE11 support (React 18+)

2. Development Requirements

   - Node.js environment
   - NPM for package management
   - TypeScript knowledge required

3. Content Management
   - Markdown-based policy content
   - Bilingual content requirements
   - Static file-based data structure

## Build & Deployment

1. Build Process

   - Vite-based build pipeline
   - TypeScript compilation
   - Asset optimization
   - Markdown processing

2. Output

   - Static site output
   - Optimized for deployment
   - SEO-friendly structure

3. Performance Considerations
   - Code splitting
   - Asset optimization
   - Static generation
   - Client-side routing
