import * as esbuild from 'esbuild'
import UnpluginMarkdown2Html from 'unplugin-markdown-2-html/esbuild'

const browserTargets = [
  'es2018',
  'chrome60',
  'edge79',
  'firefox55',
  'safari11',
];

let cssCtx = await esbuild.context({
  entryPoints: ['src/app.css'],
  bundle: true,
  outfile: 'www/css/style.css',
  loader: {
    ".woff": "file",
    ".woff2": "file",
    ".gif": "file",
    ".svg": "file",
  },
  target: browserTargets,
})

let jsCtx = await esbuild.context({
  entryPoints: ['src/root.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'www/js/bundle.js',
  target: browserTargets,
  plugins: [
    UnpluginMarkdown2Html()
  ],
  define: {
    'window.IS_PRODUCTION': 'false',
  },
})

let { host, port } = await jsCtx.serve({
  servedir: 'www',
  fallback: 'www/index.html'
})

await jsCtx.watch()
await cssCtx.watch()
console.log('Watching...')