import puppeteer from "puppeteer";
import {
  GARY_USERNAME,
  GARY_PASSWORD,
} from "@csrf-challenge/common/src/costants";

export default async function urlVisit(message: string): Promise<void> {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://localhost:5500/login", {
    waitUntil: "networkidle2",
  });
  await page.screenshot({ path: "example.png" });
  await page.type('[name="username"]', GARY_USERNAME);
  await page.type('[name="password"]', GARY_PASSWORD);
  await page.click('button[type="submit"]');

  await page.goto(message, { waitUntil: "networkidle2" });
  await browser.close();
}
