// Minimal reproducer for the batch-2a tatweel findings.
// Smallest fixture that exercises the gate's own classifier, with no build and no corpus.
import { classifyPage, RULES } from 'file:///C:/Users/deluc/Documents/adventureastro/scripts/lib/bidi-isolation.mjs';

const run = (label, html) => {
  const scopes = classifyPage(html, { baseDirection: 'rtl', rule: RULES.flanking });
  const findings = scopes.flatMap((s) => s.findings.map((f) => `${JSON.stringify(f.char)} ${f.left}…${f.right}`));
  console.log(
    `${findings.length ? 'FINDING ' : '  clean '} ${label.padEnd(46)} ${findings.join(' | ')}`
  );
};

console.log('--- the two batch-2a findings, reduced to one <li> each ---');
run('backpacking:  فـ«عدم ترك أثر» يعني', '<li>معك. فـ«عدم ترك أثر» يعني أن</li>');
run('best-hikes:   لـ«تحسين» صورة', '<li>أبدًا لـ«تحسين» صورة فذلك</li>');

console.log('\n--- isolate the variable: same sentence, tatweel removed ---');
run('control: same text WITHOUT U+0640', '<li>معك. ف«عدم ترك أثر» يعني أن</li>');

console.log('\n--- one character on each flank, nothing else ---');
run('R «…» R   (plain Arabic letters)', '<li>ف«عدم» ي</li>');
run('R «…» R   (tatweel on left flank)', '<li>فـ«عدم» ي</li>');
run('R (…) R   (tatweel on left flank)', '<li>فـ(عدم) ي</li>');
run('R «…» R   (tatweel on right flank)', '<li>ف«عدم» ـي</li>');
run('L «…» R   (genuine direction change)', '<li>Forest«عدم» ي</li>');
