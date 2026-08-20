import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
export const siteDirectory = path.resolve(scriptsDirectory, '..');
export const manifestPath = path.join(siteDirectory, 'lib', 'figure-manifest.ts');

/** Load the TypeScript manifest without requiring a project-specific runtime loader. */
export async function loadFigureManifestModule() {
  const source = await readFile(manifestPath, 'utf8');
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
    fileName: manifestPath,
    reportDiagnostics: true,
  });

  const errors = (result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    const formatted = ts.formatDiagnosticsWithColorAndContext(errors, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => siteDirectory,
      getNewLine: () => '\n',
    });
    throw new Error(`Unable to transpile figure manifest:\n${formatted}`);
  }

  const hash = createHash('sha256').update(source).digest('hex').slice(0, 12);
  const encoded = Buffer.from(`${result.outputText}\n//# sourceURL=${pathToFileURL(manifestPath).href}?v=${hash}`).toString('base64');
  return import(`data:text/javascript;base64,${encoded}`);
}
