import { Page } from '@playwright/test';


export class BasePage {
  protected page: Page;
  protected baseURL = 'https://demowebshop.tricentis.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = ''): Promise<void> {
    const url = path ? `${this.baseURL}/${path}` : this.baseURL;
    console.log(`[NAV] ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  }

  async click(selector: string): Promise<void> {
    console.log(`[CLICK] ${selector}`);
    await this.page.click(selector);
  }

  async fill(selector: string, value: string): Promise<void> {
    console.log(`[FILL] ${selector}="${value}"`);
    await this.page.fill(selector, value);
  }

  async selectDropdown(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  async getText(selector: string): Promise<string | null> {
    try {
      return await this.page.textContent(selector);
    } catch {
      return null;
    }
  }

  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  async isEnabled(selector: string): Promise<boolean> {
    try {
      return await this.page.isEnabled(selector);
    } catch {
      return false;
    }
  }

  async isChecked(selector: string): Promise<boolean> {
    try {
      return await this.page.isChecked(selector);
    } catch {
      return false;
    }
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForURL(urlPattern: string | RegExp, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
  }

  async waitForPageLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.log('[WARN] Network idle timeout');
    }
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async clearInput(selector: string): Promise<void> {
    await this.page.fill(selector, '');
  }

  async getAllText(selector: string): Promise<string[]> {
    const elements = await this.page.locator(selector).all();
    const texts: string[] = [];
    for (const el of elements) {
      const text = await el.textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async hover(selector: string): Promise<void> {
    await this.page.hover(selector);
  }

  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}