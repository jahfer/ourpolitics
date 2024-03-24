import * as React from 'react'
import * as Server from 'react-dom/server'
import { createRoot } from 'react-dom/client'
import App from './components/app'

declare global {
  var IS_PRODUCTION: Boolean;
}

if (!window.IS_PRODUCTION) {
  new EventSource('/esbuild').addEventListener('change', () => location.reload())
}

const $pageRoot = document.getElementById('page-root') as HTMLElement;
const root = createRoot($pageRoot);
root.render(<App />);