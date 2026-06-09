import { readFileSync, writeFileSync } from 'fs';

const configPath = '.vercel/output/functions/_render.func/.vc-config.json';
const config = JSON.parse(readFileSync(configPath, 'utf8'));
config.runtime = 'nodejs20.x';
writeFileSync(configPath, JSON.stringify(config, null, '\t') + '\n');
console.log('✓ Patched runtime to nodejs20.x');
