import * as esbuild from 'esbuild'
import UnpluginMarkdown2Html from 'unplugin-markdown-2-html/esbuild'
import * as path from 'node:path'

import fastGlob from 'fast-glob';

let mdDirectoryImportPlugin = {
  name: 'md-dir-import',
  setup(build) {
    build.onResolve({ filter: /\*.*\.md$/ }, args => ({
      path: args.path,
      watchDirs: [args.resolveDir],
      pluginData: { resolveDir: args.resolveDir },
      namespace: 'md-dir-import-ns',
    }));

    build.onLoad({ filter: /.*/, namespace: 'md-dir-import-ns' }, async (args) => {
      const files = await fastGlob(args.path, {
        cwd: args.pluginData.resolveDir,
      });

      const parsedFiles = files.map(file => {
        const lang = (/\.en\.md$/.test(file)) ? 'EN' : 'FR';
        const key = [
          path.basename(file, ".md"),
          path.basename(file, ".en.md"),
          path.basename(file, ".fr.md"),
        ].reduce((next, str) => next.length < str.length ? next : str) + '_' + lang;

        return { key, file }
      });

      const contents = `
        ${files.map((file, index) => `import { html as __policy_html_${index} } from '${file}';`).join('\n')}
        export const html = {
          ${parsedFiles.map(({ key }, index) => `${key}: __policy_html_${index}`).join(',')}
        };
      `;

      return { contents, resolveDir: args.pluginData.resolveDir, loader: 'js' }
    })
  },
}

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
  logLevel: 'debug',
  loader: {
    ".woff": "file",
    ".woff2": "file",
    ".gif": "file",
    ".svg": "dataurl",
  },
  target: browserTargets,
  define: {
    'window.IS_PRODUCTION': 'false',
  },
})

let jsCtx = await esbuild.context({
  entryPoints: ['src/root.tsx'],
  bundle: true,
  minify: false,
  sourcemap: false,
  outfile: 'www/js/bundle.js',
  logLevel: 'debug',
  target: browserTargets,
  plugins: [
    mdDirectoryImportPlugin,
    UnpluginMarkdown2Html({ anchor: { level: 6 }}),
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