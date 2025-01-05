import puppeteer, { Page } from "puppeteer-core";

const URL = "https://www.amazon.com";

// Define a type for product results
interface Product {
  title: string;
  price: string;
  url: string;
}

// Function to search Amazon for a given search term
export async function searchAmazon(searchTerm: string): Promise<Product[]> {
  const browser = await puppeteer.connect({
    browserWSEndpoint: "wss://brd-customer-hl_1f9f0e69-zone-scraping_browser1:di28uv0cybx0@brd.superproxy.io:9222",
  });

  console.log("Connected to browser...");
  console.log("Sending requests via residential proxies...");

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  try {
    // Navigate to Amazon
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    console.log("Navigated to home page");
    await page.waitForSelector("#twotabsearchtextbox", { timeout: 30000 });

    // Enter the search term
    await page.type("#twotabsearchtextbox", searchTerm);
    console.log(`Entered search term: ${searchTerm}`);
    await page.keyboard.press("Enter");

    // Wait for the products to load
    await page.waitForSelector(".s-card-container", { timeout: 30000 });
    console.log("Products loaded, parsing...");

    // Parse the results
    const results = await parseResults(page);
    console.log(`Found ${results.length} products`);

    return results;
  } catch (error) {
    console.error("Error during Amazon search:", error);
    throw error;
  } finally {
    await browser.close();
    console.log("Browser closed.");
  }
}

// Helper function to parse product results from the page
async function parseResults(page: Page): Promise<Product[]> {
  return await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".s-card-container")).map(el => {
      const titleElement = el.querySelector("h2 span");
      const priceElement = el.querySelector(".a-price > .a-offscreen");
      const urlElement = el.querySelector("a");

      return {
        title: titleElement?.innerText || "No Title",
        price: priceElement?.innerText || "No Price",
        url: urlElement?.getAttribute("href") || "No URL",
      };
    });
  });
}

// Example usage
(async () => {
  try {
    const searchTerm = "laptop"; // Replace with your desired search term
    const results = await searchAmazon(searchTerm);

    // Log the results
    results.forEach(({ title, price, url }) => {
      console.log(`Title: ${title}, Price: ${price}, URL: ${url ? `https://www.amazon.com${url}` : "N/A"}`);
    });
  } catch (error) {
    console.error("Error fetching Amazon search results:", error);
  }
})();
