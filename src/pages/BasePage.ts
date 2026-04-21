import { Page, Locator, expect } from "@playwright/test";
import { Logger } from "../utils/logger";

// Provides common functionality for all page objects
export abstract class BasePage {
  protected page: Page;
  protected logger: Logger;
  protected baseURL = "https://demo.nopcommerce.com";

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
  }

  // Navigate to a specific path

  async navigate(path: string = ""): Promise<void> {
    const url = `${this.baseURL}/${path}`;
    this.logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: "networkidle" });
  }

  // Click an element

  async click(selector: string, description: string = ""): Promise<void> {
    const desc = description ? ` (${description})` : "";
    this.logger.info(`Clicking: ${selector}${desc}`);
    const locator = this.page.locator(selector);
    await locator.click({ force: true });
  }

  // Fill input field

  async fill(
    selector: string,
    value: string,
    description: string = "",
  ): Promise<void> {
    const desc = description ? ` (${description})` : "";
    this.logger.info(`Filling ${selector} with "${value}"${desc}`);
    await this.page.fill(selector, value);
  }

  // Select dropdown option

  async selectDropdown(selector: string, value: string): Promise<void> {
    this.logger.info(`Selecting "${value}" from dropdown: ${selector}`);
    await this.page.selectOption(selector, value);
  }

  // Get text content of element

  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  // Check if element is visible

  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  // Check if element is enabled

  async isEnabled(selector: string): Promise<boolean> {
    try {
      return await this.page.isEnabled(selector);
    } catch {
      return false;
    }
  }

  // Check if element is checked (checkbox/radio)

  async isChecked(selector: string): Promise<boolean> {
    try {
      return await this.page.isChecked(selector);
    } catch {
      return false;
    }
  }

  // Wait for element to be visible

  async waitForElement(
    selector: string,
    timeout: number = 5000,
  ): Promise<void> {
    this.logger.info(`Waiting for element: ${selector}`);
    await this.page.waitForSelector(selector, { timeout });
  }

  // Wait for URL to match pattern

  async waitForURL(
    urlPattern: string | RegExp,
    timeout: number = 5000,
  ): Promise<void> {
    this.logger.info(`Waiting for URL: ${urlPattern}`);
    await this.page.waitForURL(urlPattern, { timeout });
  }

  // Get current URL

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  // Get page title

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Take screenshot

  async takeScreenshot(name: string): Promise<string> {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, -5);
    const filename = `./screenshots/${timestamp}_${name}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    this.logger.info(`Screenshot saved: ${filename}`);
    return filename;
  }

  // Wait for and get toast message

  async getToastMessage(timeout: number = 3000): Promise<string | null> {
    try {
      const toast = this.page
        .locator('.notification, .toast, .alert, [class //="message"]')
        .first();
      await toast.waitFor({ timeout });
      return await toast.textContent();
    } catch {
      return null;
    }
  }

  // Dismiss toast notification

  async dismissToast(): Promise<void> {
    const closeBtn = this.page
      .locator('.notification-close, .toast-close, [class //="close"]')
      .first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }

  // Scroll element into view

  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  // Hover over element

  async hover(selector: string): Promise<void> {
    await this.page.hover(selector);
  }

  // Press keyboard key

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  // Get locator for further chaining

  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  // Clear input field

  async clearInput(selector: string): Promise<void> {
    await this.page.fill(selector, "");
  }

  // Get all text from multiple elements

  async getAllText(selector: string): Promise<string[]> {
    const elements = await this.page.locator(selector).all();
    const texts: string[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  // Assert element contains text

  async assertElementContainsText(
    selector: string,
    expectedText: string,
  ): Promise<void> {
    const locator = this.page.locator(selector);
    await expect(locator).toContainText(expectedText);
  }

  // Assert element is visible

  async assertElementVisible(selector: string): Promise<void> {
    const locator = this.page.locator(selector);
    await expect(locator).toBeVisible();
  }

  // Wait for page load

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }
}
