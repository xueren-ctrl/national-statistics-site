// America by the Numbers — hand-in program (Node 22, standard library only).
// The site is this directory's app/ folder, plain static files a browser
// opens at app/index.html (ES modules, CSS, no build step). The program
// copies app/ and screenshots/ from beside this file into the output
// directory and writes dossier.json, the summary the judge reads, using the
// vendored make.fun library. It runs twice in the grader and both runs must
// write the same bytes, so there is no clock, no random number and no
// network call anywhere in here.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps, from the kit's starter notes: at most 4 screenshots
// of 256 KiB each, at most 993 files and 16 MiB under app/.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log('America by the Numbers handed in: app/ copied, dossier.json written.');
