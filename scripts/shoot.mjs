// Dev helper: capture full-page screenshots (desktop + mobile) of the preview build
// and print any console errors. Usage: node scripts/shoot.mjs [outDir]
import puppeteer from 'puppeteer-core'
import path from 'node:path'
import fs from 'node:fs'

const out = process.argv[2] || 'shots'
fs.mkdirSync(out, { recursive: true })
const URL = process.env.URL || 'http://localhost:4173/'
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] })

async function capture(name, viewport) {
  const page = await browser.newPage()
  const logs = []
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`) })
  page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`))
  await page.setViewport(viewport)
  await page.goto(URL, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 4200)) // let the page settle
  // scroll through the page to trigger in-view reveals
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total + viewport.height; y += Math.round(viewport.height * 0.6)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await new Promise((r) => setTimeout(r, 260))
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: true })
  console.log(`${name}: ${viewport.width}x${await page.evaluate(() => document.documentElement.scrollHeight)}`)
  if (logs.length) console.log(`${name} console:\n  ` + logs.join('\n  '))
  await page.close()
}

await capture('desktop', { width: 1440, height: 900 })
await capture('mobile', { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 })
await browser.close()
