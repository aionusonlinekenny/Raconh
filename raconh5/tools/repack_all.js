/**
 * repack_all.js — run this instead of the two tools separately.
 *
 * Correct order:
 *   1. translate_sections repack  (content sections, skips language)
 *   2. repack_lang                (replaces language section cleanly)
 *
 * Usage:  node repack_all.js
 */

const { execSync } = require('child_process');
const path = require('path');

const dir = __dirname;

console.log('=== Step 1: translate content sections ===');
execSync(`node "${path.join(dir, 'translate_sections.js')}" repack`, { stdio: 'inherit' });

console.log('\n=== Step 2: repack language section ===');
execSync(`node "${path.join(dir, 'repack_lang.js')}"`, { stdio: 'inherit' });

console.log('\nDone. Clear browser cache (Ctrl+Shift+Delete) and reload the game.');
