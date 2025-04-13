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
          const lang = /\.fr\.md$/.test(file) ? 'FR' : 'EN';
          const key = "mddir_" + [
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
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    minify: 'terser',
    sourcemap: 'hidden',
    target: 'esnext',
    compress: true,
  },
  define: {
    'window.IS_PRODUCTION': true,
  },
  logLevel: 'info',
});