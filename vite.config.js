import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fastGlob from 'fast-glob';
import tsconfigPaths from 'vite-tsconfig-paths'
import unpluginMarkdown2Html from 'unplugin-markdown-2-html/vite'

const mdDirectoryImportPlugin = () => {
  const virtualModuleId = 'virtual:mddir:';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'md-dir-import',
    async resolveId(source, importer) {
      if (source.startsWith(virtualModuleId)) {
        const relativeDirPath = source.slice(virtualModuleId.length);
        const resolveDir = importer ? path.dirname(importer) : process.cwd();
        return resolvedVirtualModuleId + path.resolve(resolveDir, relativeDirPath);
      }
      return null;
    },
    async load(id) {
      if (id.startsWith(resolvedVirtualModuleId)) {
        id = id.slice(resolvedVirtualModuleId.length);

        const files = await fastGlob(`${id}.md`, {
          cwd: path.dirname(id),
        });

        const parsedFiles = files.map(file => {
          const lang = /\.en\.md$/.test(file) ? 'EN' : 'FR';
          const key = [
            path.basename(file, ".md"),
            path.basename(file, ".en.md"),
            path.basename(file, ".fr.md"),
          ].reduce((next, str) => next.length < str.length ? next : str) + '_' + lang;

          return { key, file };
        });

        const contents = `
          ${files.map((file, index) => `import { html as __policy_html_${index} } from '${file}';`).join('\n')}
          export const html = {
            ${parsedFiles.map(({ key }, index) => `${key}: __policy_html_${index}`).join(',')}
          };
        `;

        return contents;
      }
      return null;
    }
  };
};

export default defineConfig({
  plugins: [
    mdDirectoryImportPlugin(),
    unpluginMarkdown2Html({
      anchor: { level: 6 }
    }),
    react(),
    tsconfigPaths(),
  ],
  assetsInclude: ['**/*.json'],
  build: {
    outDir: 'www/',
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
      },
    },
    minify: 'esbuild', // Use esbuild for minification
    sourcemap: false,
    target: 'esnext', // Adjust based on browser support requirements
  },
  define: {
    'window.IS_PRODUCTION': true,
  },
  logLevel: 'debug',
});