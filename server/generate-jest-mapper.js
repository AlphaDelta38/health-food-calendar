// generate-jest-config.js
import fs from 'fs';
import path from 'path';
import { parse } from 'jsonc-parser';

const tsconfigPath = path.resolve('./tsconfig.json');
const jestConfigPath = path.resolve('./jest.config.js');

const tsconfigRaw = fs.readFileSync(tsconfigPath, 'utf-8');
const tsconfig = parse(tsconfigRaw);
const paths = tsconfig.compilerOptions?.paths || {};
const rootDir = '<rootDir>';

const mapper = {};

for (const alias in paths) {
  const targets= paths[alias];
  let target = targets[0];

  const aliasKey = alias.replace(/\*$/, '(.*)');
  const targetValue = target.replace(/\*$/, '$1');

  mapper[`^${aliasKey}\\.js$`] = `${rootDir}/${targetValue}.ts`;
  mapper[`^${aliasKey}$`] = `${rootDir}/${targetValue}`;
}

let jestConfigRaw = fs.readFileSync(jestConfigPath, 'utf-8');

jestConfigRaw = jestConfigRaw.replace(
  /moduleNameMapper:\s*{[^}]*},?/s,
  ''
);

const mapperString = JSON.stringify(mapper, null, 2);
const insert = `moduleNameMapper: ${mapperString},`;


jestConfigRaw = jestConfigRaw.replace(
  /};\s*$/,
  `  ${insert}\n};`
);

fs.writeFileSync(jestConfigPath, jestConfigRaw, 'utf-8');

console.log('New paths has been added to jest.config.js');