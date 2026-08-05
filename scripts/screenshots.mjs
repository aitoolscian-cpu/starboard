// Visual QA + OG capture. Requires `npm run preview` on :4173 (base /starboard/).
// Usage: node scripts/screenshots.mjs [outDir]
import { chromium } from 'playwright'
import fs from 'node:fs'

const BASE = 'http://localhost:4173/starboard/'
const OUT = process.argv[2] ?? 'shots'
fs.mkdirSync(OUT, { recursive: true })

const errors = []

async function newPage(browser, { width, height, lang = 'en' }) {
  const ctx = await browser.newContext({ viewport: { width, height } })
  const page = await ctx.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      errors.push(`[console.${msg.type()}] ${msg.text()}`)
    }
  })
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))
  await page.addInitScript(([l]) => {
    sessionStorage.setItem('starboard.intro.v1', '1')
    localStorage.setItem('starboard.lang', l)
  }, [lang])
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2600) // let load orchestration settle
  return { ctx, page }
}

const shot = (page, name) => page.screenshot({ path: `${OUT}/${name}.png` })

const browser = await chromium.launch()

// ── desktop EN ──────────────────────────────────────────────
{
  const { ctx, page } = await newPage(browser, { width: 1440, height: 900 })
  await shot(page, 'sky-desktop-en')

  // hover card
  await page.locator('.star-hit').nth(2).hover()
  await page.waitForTimeout(400)
  await shot(page, 'sky-hover-en')

  // program view — ANTARES (red, escalation)
  await page.getByRole('button', { name: /ANTARES/ }).first().click()
  await page.waitForTimeout(1200)
  await shot(page, 'program-antares-overview-en')
  await page.getByRole('button', { name: 'Timeline' }).click()
  await page.waitForTimeout(1400)
  await shot(page, 'program-antares-timeline-en')
  await page.getByRole('button', { name: 'RAID' }).click()
  await page.waitForTimeout(600)
  await shot(page, 'program-antares-raid-en')
  await page.getByRole('button', { name: 'Financials' }).click()
  await page.waitForTimeout(1200)
  await shot(page, 'program-antares-financials-en')

  // CANOPUS adoption
  await page.getByRole('button', { name: 'Programs' }).click()
  await page.waitForTimeout(800)
  await page.getByRole('button', { name: /CANOPUS/ }).first().click()
  await page.waitForTimeout(900)
  await page.getByRole('button', { name: 'Adoption' }).click()
  await page.waitForTimeout(1200)
  await shot(page, 'program-canopus-adoption-en')

  // ATRIA improvement
  await page.getByRole('button', { name: 'Programs' }).click()
  await page.waitForTimeout(700)
  await page.getByRole('button', { name: /ATRIA/ }).first().click()
  await page.waitForTimeout(900)
  await page.getByRole('button', { name: 'Improvement' }).click()
  await page.waitForTimeout(1200)
  await shot(page, 'program-atria-improvement-en')

  // composer mid-stream + done
  await page.getByRole('button', { name: 'Composer' }).click()
  await page.waitForTimeout(700)
  await page.getByRole('button', { name: 'Compose', exact: true }).click()
  await page.waitForTimeout(2600)
  await shot(page, 'composer-midstream-en')
  await page.waitForTimeout(30000)
  await shot(page, 'composer-done-en')

  // steering + print emulation
  await page.getByRole('button', { name: 'Steering' }).click()
  await page.waitForTimeout(1100)
  await shot(page, 'steering-en')
  await page.emulateMedia({ media: 'print' })
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/steering-print-en.png`, fullPage: true })
  await page.emulateMedia({ media: 'screen' })

  await ctx.close()
}

// ── desktop ES ──────────────────────────────────────────────
{
  const { ctx, page } = await newPage(browser, { width: 1440, height: 900, lang: 'es' })
  await shot(page, 'sky-desktop-es')
  await page.getByRole('button', { name: /MIMOSA/ }).first().click()
  await page.waitForTimeout(1100)
  await shot(page, 'program-mimosa-overview-es')
  await page.getByRole('button', { name: 'Comité' }).click()
  await page.waitForTimeout(1100)
  await shot(page, 'steering-es')
  await ctx.close()
}

// ── mobile 390 ──────────────────────────────────────────────
{
  const { ctx, page } = await newPage(browser, { width: 390, height: 844 })
  await shot(page, 'sky-mobile-en')
  await page.getByRole('button', { name: /CANOPUS/ }).first().click()
  await page.waitForTimeout(1000)
  await shot(page, 'program-mobile-en')
  await ctx.close()
}

// ── 375 narrowest ───────────────────────────────────────────
{
  const { ctx, page } = await newPage(browser, { width: 375, height: 812, lang: 'es' })
  await shot(page, 'sky-mobile-375-es')
  await ctx.close()
}

// ── intro (fresh session) ───────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2900)
  await page.screenshot({ path: `${OUT}/intro-en.png` })
  await ctx.close()
}

// ── og image 1200×630 ───────────────────────────────────────
{
  const { ctx, page } = await newPage(browser, { width: 1200, height: 630 })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/og.png` })
  await ctx.close()
}

await browser.close()

fs.writeFileSync(`${OUT}/console-report.txt`, errors.length ? errors.join('\n') : 'CLEAN — no console errors/warnings')
console.log(errors.length ? `⚠ ${errors.length} console messages — see ${OUT}/console-report.txt` : '✓ console clean')
console.log('done')
