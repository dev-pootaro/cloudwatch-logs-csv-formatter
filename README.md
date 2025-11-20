# CloudWatch Logs CSV Formatter

A small CLI utility that flattens newline characters inside quoted CSV fields so that CloudWatch log exports can be safely imported by downstream tools.

## Features
- Replaces newlines inside quoted fields with spaces while leaving structural record breaks intact.
- Recursively processes a directory of `.csv` files while mirroring the input folder structure in the output directory.
- Works with default input/output locations or configurable paths through environment variables and CLI arguments.

## Requirements
- Node.js 18+ (for `tsx` execution).

## Installation
Install dependencies with npm or yarn:

```bash
npm install
# or
yarn install
```

## Usage
Run the formatter with the bundled script:

```bash
npm run formatcsv
```

By default, the script reads CSV files from `/workspace/input` and writes the processed files to `/workspace/output`. You can override these locations with environment variables or by passing arguments directly to the script entry point.

### Environment variables
- `INPUT_CSV_DIR`: Absolute or relative path to the directory containing source CSV files.
- `OUTPUT_CSV_DIR`: Absolute or relative path where flattened CSVs will be written.

Example:

```bash
INPUT_CSV_DIR=./raw-logs OUTPUT_CSV_DIR=./flattened npm run formatcsv
```

### Direct invocation with arguments
If you want to invoke the script without environment variables, you can pass the input and output directories as arguments (the second argument overrides `OUTPUT_CSV_DIR`):

```bash
npx tsx src/index.ts ./raw-logs ./flattened
```

## How it works
1. The script validates the input directory and creates the output directory if it does not exist.
2. It walks the input tree recursively, copying the directory structure to the output tree.
3. For each CSV file, newline characters inside quoted fields are replaced with spaces, ensuring multiline log messages stay within a single record.
4. Flattened files are written to the mirrored location in the output directory.

## Troubleshooting
- If you see `Error: input No search direcroty`, confirm the input path is correct and accessible.
- Ensure that the process has write permissions to the output directory.

## License
MIT
