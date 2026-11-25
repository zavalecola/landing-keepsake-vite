import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const srcDir = path.resolve('src/assets/images')
const pubDir = path.resolve('public/assets/images')
fs.mkdirSync(srcDir, { recursive: true })
fs.mkdirSync(pubDir, { recursive: true })

const items = [
  {
    name: 'work-01',
    title: 'Pure Bloom',
    sub: 'BRANDING • PACKAGING',
    bg1: '#dfe7dc',
    bg2: '#7a9676',
    fg: '#1c2b1b',
  },
  {
    name: 'work-02',
    title: 'Nordic Print',
    sub: 'PRINT • EDITORIAL',
    bg1: '#dce5ee',
    bg2: '#4d6b8a',
    fg: '#152536',
  },
  {
    name: 'work-03',
    title: 'Aura Identity',
    sub: 'IDENTITY • SYSTEM',
    bg1: '#efe3d6',
    bg2: '#a87c52',
    fg: '#2f1e10',
  },
]

const widths = [400, 800]

for (const item of items) {
  for (const w of widths) {
    const h = Math.round((w * 632) / 800)
    const svg = `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${item.bg1}" />
            <stop offset="100%" stop-color="${item.bg2}" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="url(#g)" />
        <rect x="${Math.round(w * 0.08)}" y="${Math.round(h * 0.12)}" width="${Math.round(w * 0.84)}" height="${Math.round(h * 0.76)}" rx="${Math.round(w * 0.03)}" fill="rgba(255,255,255,0.82)" />
        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="${item.fg}" font-family="Arial, sans-serif" font-weight="700" font-size="${Math.round(w * 0.065)}">${item.title}</text>
        <text x="50%" y="59%" dominant-baseline="middle" text-anchor="middle" fill="${item.fg}" font-family="Arial, sans-serif" letter-spacing="2" font-size="${Math.round(w * 0.028)}">${item.sub}</text>
      </svg>
    `

    const base = sharp(Buffer.from(svg)).resize(w, h)
    for (const dir of [srcDir, pubDir]) {
      const prefix = path.join(dir, `${item.name}-${w}`)
      await base.clone().avif({ quality: 65 }).toFile(`${prefix}.avif`)
      await base.clone().webp({ quality: 80 }).toFile(`${prefix}.webp`)
      await base
        .clone()
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(`${prefix}.jpg`)
    }
  }
}

console.log(
  'Generated AVIF, WebP, and JPEG in src/assets/images and public/assets/images.',
)
