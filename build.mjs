import * as esbuild from 'esbuild'

const browserTargets = [
  'es2018',
  'chrome60',
  'edge79',
  'firefox55',
  'safari11',
];

await esbuild.build({
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

let ctx = await esbuild.context({
  entryPoints: ['src/root.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'www/js/bundle.js',
  target: browserTargets,
  loader: {
    ".md": "text",
  },
  define: {
    'window.IS_PRODUCTION': 'false',
  },
})

let { host, port } = await ctx.serve({
  servedir: 'www',
  fallback: 'www/index.html'
})

await ctx.watch()
console.log('Watching...')