// Dev helper: list elements extending past the viewport's right edge.
import puppeteer from 'puppeteer-core'
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
for (const vw of [1440, 390]) {
  const page = await browser.newPage()
  await page.setViewport({ width: vw, height: 900 })
  await page.goto(process.env.URL || 'http://localhost:4173/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 4500))
  const rows = await page.evaluate(() => {
    const W = window.innerWidth, out = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0) continue
      if (r.right > W + 2) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(r.right)} w=${Math.round(r.width)}`)
    }
    return { sw: document.documentElement.scrollWidth, out: out.slice(0, 25) }
  })
  console.log(`\n== ${vw}px  scrollWidth=${rows.sw}`); console.log(rows.out.join('\n'))
  await page.close()
}
await browser.close()
