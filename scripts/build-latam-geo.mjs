// One-time build script: filter world-atlas countries-110m topojson down to a
// Latin America GeoJSON, rounded to 2 decimals, committed as src/data/latam-geo.json.
// Usage: node scripts/build-latam-geo.mjs <path-to-countries-110m.json>
import fs from 'node:fs'
import { feature } from 'topojson-client'

const src = process.argv[2]
if (!src) throw new Error('pass path to countries-110m.json')
const world = JSON.parse(fs.readFileSync(src, 'utf8'))

const KEEP = new Set([
  'Mexico', 'Guatemala', 'Belize', 'Honduras', 'El Salvador', 'Nicaragua',
  'Costa Rica', 'Panama', 'Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Brazil',
  'Bolivia', 'Paraguay', 'Chile', 'Argentina', 'Uruguay', 'Guyana', 'Suriname',
  'Cuba', 'Haiti', 'Dominican Rep.', 'Jamaica', 'Puerto Rico',
  'Trinidad and Tobago',
])

const all = feature(world, world.objects.countries)
const round = (n) => Math.round(n * 100) / 100
const roundCoords = (c) =>
  typeof c[0] === 'number' ? c.map(round) : c.map(roundCoords)

const features = all.features
  .filter((f) => KEEP.has(f.properties.name))
  .map((f) => ({
    type: 'Feature',
    properties: { name: f.properties.name },
    geometry: { type: f.geometry.type, coordinates: roundCoords(f.geometry.coordinates) },
  }))

const found = new Set(features.map((f) => f.properties.name))
for (const k of KEEP) if (!found.has(k)) console.warn('missing:', k)

const out = { type: 'FeatureCollection', features }
fs.writeFileSync('src/data/latam-geo.json', JSON.stringify(out))
console.log('wrote src/data/latam-geo.json', features.length, 'features',
  (fs.statSync('src/data/latam-geo.json').size / 1024).toFixed(1) + 'KB')
