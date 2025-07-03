// generateCars.js
const fs   = require('fs');
const path = require('path');

const txtPath = path.join(__dirname, 'cars.txt');
if (!fs.existsSync(txtPath)) {
  console.error("❌ cars.txt not found!");
  process.exit(1);
}

let raw = fs.readFileSync(txtPath, 'utf-8');
raw = raw.replace(/\r\n/g, '\n');             // Normalize CRLF → LF

const blocks = raw.split(/\n\s*\n/);          // Split on any blank line

const records = [];
const bad = [];

blocks.forEach((block, idx) => {
  const lines = block
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length);

  if (lines.length !== 3) {
    bad.push({ idx: idx + 1, lines });
    return;
  }

  const [vehicle, category, priceLine] = lines;
  const msrp = parseInt(priceLine.replace(/[^0-9]/g, ''), 10);
  if (isNaN(msrp)) {
    bad.push({ idx: idx + 1, lines });
    return;
  }

  const id = vehicle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

  records.push({ id, vehicle, category, msrp });
});

if (bad.length) {
  console.error("❌ Malformed blocks detected in cars.txt:");
  bad.forEach(b => console.error(`  Block ${b.idx}:`, b.lines));
  process.exit(1);
}

let out = "export const CARS = [\n";
records.forEach(r => {
  out += `  { id: '${r.id}', vehicle: ${JSON.stringify(r.vehicle)}, category: ${JSON.stringify(r.category)}, msrp: ${r.msrp} },\n`;
});
out += "];\n";

const dest = path.join(__dirname, 'src/data');
fs.mkdirSync(dest, { recursive: true });
fs.writeFileSync(path.join(dest, 'cars.js'), out);

console.log(`✅ Wrote ${records.length} vehicles to src/data/cars.js`);
