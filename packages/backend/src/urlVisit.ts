import puppeteer from "puppeteer";
import {
  GARY_USERNAME,
  GARY_PASSWORD,
} from "@csrf-challenge/common/dist/costants";

export default async function urlVisit(message: string): Promise<void> {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://localhost:3000", {
    waitUntil: "networkidle2",
  });
  await page.type('[name="username"]', GARY_USERNAME);
  await page.type('[name="password"]', GARY_PASSWORD);
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]'),
  ]);

  const cookies = await page.cookies();

  await page.goto(message, { waitUntil: "networkidle2" });
  await browser.close();
}
