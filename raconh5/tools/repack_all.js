/**
 * repack_all.js — run this instead of the two tools separately.
 *
 * Correct order:
 *   1. Restore original Chinese res/cw.txt from .original backup
 *   2. translate_sections repack  (content sections, skips language)
 *   3. repack_lang                (replaces language section cleanly)
 *
 * Usage:  node repack_all.js
 */

const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const dir    = __dirname;
const CW     = path.join(dir, '../client/main/resource/res/cw.txt');
const CW_ORI = CW + '.original';

// Step 0: restore from .original so we always start from clean Chinese source
if (!fs.existsSync(CW_ORI)) {
    console.log('Creating .original backup of the current res/cw.txt...');
    fs.copyFileSync(CW, CW_ORI);
}
console.log('=== Step 0: restore original Chinese res/cw.txt ===');
fs.copyFileSync(CW_ORI, CW);
console.log('  Restored from', CW_ORI);

console.log('\n=== Step 1: translate content sections ===');
execSync(`node "${path.join(dir, 'translate_sections.js')}" repack`, { stdio: 'inherit' });

console.log('\n=== Step 2: repack language section ===');
execSync(`node "${path.join(dir, 'repack_lang.js')}"`, { stdio: 'inherit' });

console.log('\nDone. Use InPrivate mode (Ctrl+Shift+N) or clear browser cache to see changes.');
