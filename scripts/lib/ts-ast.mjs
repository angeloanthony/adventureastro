// scripts/lib/ts-ast.mjs — TypeScript AST helpers, one copy.
//
// Extracted at F4 Phase 1 from gate-4i and gate-4j, which carried byte-identical
// definitions of `declOf`, `keyOf`, `stringOf` and `unwrap`. Two hand-maintained copies
// of a parser is the same defect class as two hand-maintained copies of `visibleText()`,
// which F3 Phase 4a removed for the same reason.
//
// WHY AST AND NOT `import()`. The host's dictionary modules cannot be imported: their
// extensionless specifiers defeat Node's type-stripping loader. A regex over a
// thousand-line dictionary would match keys inside comments and prose. Reading the tree
// is the only correct option, and it is also why these helpers are ENGINE, not host
// shape — they know how TypeScript is written, never what this repository declares.
import { readFileSync } from 'node:fs';
import ts from 'typescript';

/** Parse a file into an AST. Syntax errors surface as garbage nodes, not throws. */
export function parseSourceFile(file) {
  return ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
}

/** Unwrap `x as const satisfies T` / parenthesized initializers to the real value. */
export function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}

/** The initializer of a top-level `const NAME = …`, unwrapped, or undefined. */
export function declOf(sf, name) {
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const d of stmt.declarationList.declarations) {
      if (ts.isIdentifier(d.name) && d.name.text === name) return unwrap(d.initializer);
    }
  }
  return undefined;
}

/** A property key as text, whether written `en:` or `"slide-001":`. */
export function keyOf(prop) {
  const n = prop.name;
  if (!n) return null;
  if (ts.isIdentifier(n) || ts.isStringLiteral(n) || ts.isNumericLiteral(n)) return n.text;
  return null; // computed key — rejected by the caller
}

/** A string-literal value as text, or null if it is not a literal string. */
export function stringOf(node) {
  const v = unwrap(node);
  if (!v) return null;
  return ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v) ? v.text : null;
}

/** `file:line` for a node, relative to `root`, so a failure points at the exact line. */
export function at(sf, node, root) {
  const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
  return `${sf.fileName.slice(root.length + 1).replace(/\\/g, '/')}:${line + 1}`;
}
