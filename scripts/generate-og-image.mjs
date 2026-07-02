import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '../public/og-image.jpg');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FBF6EE" />
      <stop offset="100%" stop-color="#EFE4D2" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect x="40" y="40" width="1120" height="550" rx="28" fill="none" stroke="#B7472A" stroke-width="3" stroke-dasharray="2 14" stroke-linecap="round" opacity="0.5" />
  <circle cx="1000" cy="150" r="90" fill="#E7A83E" opacity="0.25" />
  <circle cx="150" cy="480" r="110" fill="#6E7A5A" opacity="0.15" />
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="96" font-weight="600" fill="#3A2A20">Cozy Cafe</text>
  <text x="600" y="370" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-style="italic" fill="#B7472A">Edinburgh's Best Breakfast Takeaway</text>
  <text x="600" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#6B5B4E">Turkish &amp; British Café · Ferry Road, Leith</text>
</svg>
`;

await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(outPath);
console.log('Generated', outPath);
