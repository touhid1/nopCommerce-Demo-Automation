import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * SearchPage Object
 * Handles search, filtering, sorting, and pagination
 */
export class SearchPage extends BasePage {
  // Selectors
  private readonly SEARCH_INPUT = 'input[id="q"]';
  private readonly SEARCH_BUTTON = 'button[type="submit"]';
  private readonly PRODUCT_ITEM = ".product-item";
  private readonly PRODUCT_NAME = ".product-title";
  private readonly PRODUCT_PRICE = ".product-price";
  private readonly NO_RESULTS_MESSAGE = ".no-result";
  private readonly PRICE_MIN_INPUT = 'input[id="PriceMin"]';
  private readonly PRICE_MAX_INPUT = 'input[id="PriceMax"]';
  private readonly FILTER_BUTTON = 'input[type="submit"][value="Filter"]';
  private readonly SORT_DROPDOWN = 'select[id="products-orderby"]';
  private readonly PAGINATION_NEXT = ".next-page";
  private readonly PAGINATION_PREVIOUS = ".previous-page";
  private readonly PRODUCT_COUNT = ".product-filters span";

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to search page
   */
  async navigateToSearch(): Promise<void> {
    await this.navigate("search");
    await this.waitForPageLoad();
  }

  /**
   * Search for product
   */
  async searchProduct(searchTerm: string): Promise<void> {
    await this.navigateToSearch();
    await this.fill(this.SEARCH_INPUT, searchTerm);
    await this.click(this.SEARCH_BUTTON);
    await this.waitForPageLoad();
    console.log(`[INFO] Searched for: ${searchTerm}`);
  }

  /**
   * Get all product names on current page
   */
  async getAllProductNames(): Promise<string[]> {
    const products = await this.page.locator(this.PRODUCT_ITEM).all();
    const names: string[] = [];
    for (const product of products) {
      const nameElem = await product.locator(this.PRODUCT_NAME).textContent();
      if (nameElem) {
        names.push(nameElem.trim());
      }
    }
    return names;
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    const products = await this.page.locator(this.PRODUCT_ITEM).all();
    return products.length;
  }

  /**
   * Get all product prices on current page
   */
  async getAllProductPrices(): Promise<number[]> {
    const products = await this.page.locator(this.PRODUCT_ITEM).all();
    const prices: number[] = [];
    for (const product of products) {
      const priceText = await product.locator(this.PRODUCT_PRICE).textContent();
      if (priceText) {
        prices.push(this._extractPrice(priceText));
      }
    }
    return prices;
  }

  /**
   * Click product by name
   */
  async clickProduct(productName: string): Promise<void> {
    const products = await this.page.locator(this.PRODUCT_ITEM).all();
    for (const product of products) {
      const text = await product.textContent();
      if (text && text.includes(productName)) {
        await product.click();
        await this.waitForPageLoad();
        console.log(`[INFO] Clicked product: ${productName}`);
        return;
      }
    }
  }

  /**
   * Check if no results message is displayed
   */
  async isNoResultsDisplayed(): Promise<boolean> {
    return await this.isVisible(this.NO_RESULTS_MESSAGE);
  }

  /**
   * Set price filter
   */
  async setPriceFilter(minPrice: number, maxPrice: number): Promise<void> {
    await this.fill(this.PRICE_MIN_INPUT, String(minPrice));
    await this.fill(this.PRICE_MAX_INPUT, String(maxPrice));
    await this.click(this.FILTER_BUTTON);
    await this.waitForPageLoad();
    console.log(`[INFO] Applied price filter: $${minPrice} - $${maxPrice}`);
  }

  /**
   * Sort results
   */
  async sortResults(sortOption: string): Promise<void> {
    await this.selectDropdown(this.SORT_DROPDOWN, sortOption);
    await this.waitForPageLoad();
    console.log(`[INFO] Sorted by: ${sortOption}`);
  }

  /**
   * Go to next page
   */
  async goToNextPage(): Promise<void> {
    if (await this.isVisible(this.PAGINATION_NEXT)) {
      await this.click(this.PAGINATION_NEXT);
      await this.waitForPageLoad();
      console.log("[INFO] Moved to next page");
    }
  }

  /**
   * Go to previous page
   */
  async goToPreviousPage(): Promise<void> {
    if (await this.isVisible(this.PAGINATION_PREVIOUS)) {
      await this.click(this.PAGINATION_PREVIOUS);
      await this.waitForPageLoad();
      console.log("[INFO] Moved to previous page");
    }
  }

  /**
   * Verify products contain search term
   */
  async verifyProductsContainSearchTerm(searchTerm: string): Promise<boolean> {
    const products = await this.getAllProductNames();
    return products.every((product) =>
      product.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  /**
   * Extract price from text
   */
  private _extractPrice(priceText: string): number {
    const match = priceText.replace(/,/g, "").match(/\d+\.?\d*/);
    return match ? parseFloat(match[0]) : 0;
  }
}
