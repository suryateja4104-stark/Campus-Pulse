import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('dist');
const destDir = path.resolve('docs');

try {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.cpSync(srcDir, destDir, { recursive: true });

  // Sanitize index.html for iOS Safari & Mobile Chrome compatibility
  const indexPath = path.join(destDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    content = content.replace(/\s+crossorigin(?:="[^"]*")?/gi, '');
    content = content.replace(/src="\.\/assets\//gi, 'src="assets/');
    content = content.replace(/href="\.\/assets\//gi, 'href="assets/');
    fs.writeFileSync(indexPath, content, 'utf8');
  }

  console.log('Successfully copied dist to docs folder and sanitized iOS tags!');
} catch (err) {
  console.error('Error copying dist to docs:', err);
  process.exit(1);
}
