import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://127.0.0.1:3000/";
const out = process.argv[3] ?? ".screenshot-expertise.png";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0" });

const section = await page.$("#expertise");
if (!section) {
  throw new Error("Missing #expertise");
}

await section.scrollIntoView();
await page.waitForTimeout(300);

const box = await section.boundingBox();
await page.screenshot({
  path: out,
  clip: {
    x: 0,
    y: Math.max(0, box.y - 8),
    width: 1440,
    height: Math.ceil(box.height + 16),
  },
});

await browser.close();
