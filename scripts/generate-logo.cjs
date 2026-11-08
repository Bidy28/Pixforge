/*
 * Génère le monogramme PixForge en PNG, sans dépendance externe.
 *
 * Le « P » est construit géométriquement : une hampe rectangulaire + un demi
 * anneau elliptique, avec une contreforme d'épaisseur constante. Rendu par
 * suréchantillonnage 4x4 pour un bord net à toutes les tailles.
 */
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const SIZE = 1024;
const SS = 4; // échantillons par axe et par pixel

/*
 * Géométrie du glyphe, en coordonnées du canevas 1024.
 * Le sommet de l'ellipse extérieure est posé sur le bord droit de la hampe :
 * la tangente y est horizontale, donc la jonction se fait sans décroché.
 */
const GLYPH = {
  height: 576,
  stem: 104,
  counter: 150, // contreforme, ronde
};
GLYPH.axOut = GLYPH.stem + GLYPH.counter;
GLYPH.ayOut = GLYPH.stem + GLYPH.counter / 2;
GLYPH.width = GLYPH.stem + GLYPH.axOut;

const X0 = (SIZE - GLYPH.width) / 2;
const Y0 = (SIZE - GLYPH.height) / 2;

// Centres et rayons dérivés : l'anneau garde une épaisseur égale à la hampe.
const cxOut = X0 + GLYPH.stem;
const cy = Y0 + GLYPH.ayOut;
const axIn = GLYPH.counter / 2;
const cxIn = X0 + GLYPH.stem + axIn;
const ayIn = GLYPH.ayOut - GLYPH.stem;

function insideGlyph(x, y) {
  // Hampe verticale.
  if (x >= X0 && x <= X0 + GLYPH.stem && y >= Y0 && y <= Y0 + GLYPH.height) return true;

  // Panse : moitié droite de l'ellipse extérieure, moins la contreforme.
  if (x < cxOut) return false;

  const dxOut = (x - cxOut) / GLYPH.axOut;
  const dyOut = (y - cy) / GLYPH.ayOut;
  if (dxOut * dxOut + dyOut * dyOut > 1) return false;

  const dxIn = (x - cxIn) / axIn;
  const dyIn = (y - cy) / ayIn;
  return dxIn * dxIn + dyIn * dyIn > 1;
}

/* Coins arrondis façon icône d'application (variante transparente). */
function insideSquircle(x, y, radius) {
  const cx = Math.min(Math.max(x, radius), SIZE - radius);
  const cy2 = Math.min(Math.max(y, radius), SIZE - radius);
  const dx = x - cx;
  const dy = y - cy2;
  return dx * dx + dy * dy <= radius * radius;
}

const hex = (value) => [
  parseInt(value.slice(1, 3), 16),
  parseInt(value.slice(3, 5), 16),
  parseInt(value.slice(5, 7), 16),
];

const GRADIENT_FROM = hex('#1e8bff');
const GRADIENT_TO = hex('#0059cc');

/** Dégradé diagonal discret, du clair en haut à gauche au foncé en bas à droite. */
function background(x, y) {
  const t = Math.min(1, Math.max(0, (x / SIZE) * 0.45 + (y / SIZE) * 0.55));
  return [
    GRADIENT_FROM[0] + (GRADIENT_TO[0] - GRADIENT_FROM[0]) * t,
    GRADIENT_FROM[1] + (GRADIENT_TO[1] - GRADIENT_FROM[1]) * t,
    GRADIENT_FROM[2] + (GRADIENT_TO[2] - GRADIENT_FROM[2]) * t,
  ];
}

function render({ rounded }) {
  const radius = SIZE * 0.2237; // proportion des icônes iOS
  const raw = Buffer.alloc(SIZE * (SIZE * 4 + 1));
  const step = 1 / SS;
  const samples = SS * SS;

  for (let py = 0; py < SIZE; py += 1) {
    const rowStart = py * (SIZE * 4 + 1);
    raw[rowStart] = 0; // type de filtre : aucun

    for (let px = 0; px < SIZE; px += 1) {
      let glyphHits = 0;
      let shapeHits = 0;

      for (let sy = 0; sy < SS; sy += 1) {
        const y = py + (sy + 0.5) * step;
        for (let sx = 0; sx < SS; sx += 1) {
          const x = px + (sx + 0.5) * step;
          const inShape = rounded ? insideSquircle(x, y, radius) : true;
          if (!inShape) continue;
          shapeHits += 1;
          if (insideGlyph(x, y)) glyphHits += 1;
        }
      }

      const alpha = shapeHits / samples;
      const coverage = shapeHits === 0 ? 0 : glyphHits / shapeHits;
      const bg = background(px + 0.5, py + 0.5);

      const offset = rowStart + 1 + px * 4;
      for (let c = 0; c < 3; c += 1) {
        raw[offset + c] = Math.round(bg[c] + (255 - bg[c]) * coverage);
      }
      raw[offset + 3] = Math.round(alpha * 255);
    }
  }

  return raw;
}

/* --- Encodage PNG --- */
const crcTable = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i += 1) c = crcTable[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(raw) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(SIZE, 0);
  ihdr.writeUInt32BE(SIZE, 4);
  ihdr[8] = 8; // profondeur
  ihdr[9] = 6; // RVBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const outDir = process.argv[2];
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  { file: 'pixforge-avatar-1024.png', rounded: false },
  { file: 'pixforge-icon-1024.png', rounded: true },
];

targets.forEach(({ file, rounded }) => {
  const out = path.join(outDir, file);
  fs.writeFileSync(out, encodePng(render({ rounded })));
  console.log(`${file} — ${(fs.statSync(out).size / 1024).toFixed(1)} Ko`);
});

console.log(
  `glyphe : ${GLYPH.width}x${GLYPH.height}, contreforme ${(axIn * 2).toFixed(0)}x${(ayIn * 2).toFixed(0)}`
);
