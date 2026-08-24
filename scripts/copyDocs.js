import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('dist');
const destDir = path.resolve('docs');

try {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('Successfully copied dist to docs folder!');
} catch (err) {
  console.error('Error copying dist to docs:', err);
  process.exit(1);
}
