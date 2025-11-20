import * as fs from 'fs';
import * as path from 'path';

function flattenNewlinesInCsv(csvText: string): string {
  let result = '';
  let insideQuote = false;

  for (let i = 0; i < csvText.length; i++) {
    const ch = csvText[i];

    if (ch === '"') {
      if (insideQuote && csvText[i + 1] === '"') {
        result += '""';
        i++;
      } else {
        insideQuote = !insideQuote;
        result += ch;
      }
      continue;
    }

    if (insideQuote && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && csvText[i + 1] === '\n') i++;
      result += ' ';
      continue;
    }

    result += ch;
  }

  return result;
}

function processDirectory(inputDir: string, outputDir: string) {
  const entries = fs.readdirSync(inputDir, { withFileTypes: true });

  for (const entry of entries) {
    const inPath = path.join(inputDir, entry.name);
    const outPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath, { recursive: true });
      }
      processDirectory(inPath, outPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.csv')) {
      console.log(`Processing: ${inPath}`);

      const csvRaw = fs.readFileSync(inPath, 'utf8');
      const flattened = flattenNewlinesInCsv(csvRaw);

      fs.writeFileSync(outPath, flattened, 'utf8');
      console.log(`Output: ${outPath}`);
    }
  }
}

function main(
  inputDir = process.env.INPUT_CSV_DIR ?? '/workspace/input',
  outPutDir = process.env.OUTPUT_CSV_DIR ?? '/workspace/output'
) {
  const INPUT_DIR = path.resolve(inputDir);
  const OUTPUT_DIR = path.resolve(outPutDir);

  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Error: input No search direcroty: ${INPUT_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  processDirectory(INPUT_DIR, OUTPUT_DIR);

  console.log('=== Finished ===');
}

main();
