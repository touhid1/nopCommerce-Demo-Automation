import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductPage Object
 * Handles product details and add to cart operations
 */
export class ProductPage extends BasePage {
  // Selectors
  private readonly PRODUCT_NAME = 'h1';
  private readonly PRODUCT_PRICE = '.product-price';
  private readonly PRODUCT_DESCRIPTION = '.full-description';
  private readonly QUANTITY_INPUT = 'input[id="product_quantity_"]';
  private readonly ADD_TO_CART_BUTTON = 'input[id="add-to-cart-button-"]';
  private readonly OUT_OF_STOCK_LABEL = '.out-of-stock';
  private readonly IN_STOCK_LABEL = '.in-stock';
  private readonly WISHLIST_BUTTON = 'input[id="add-to-wishlist-button-"]';
  private readonly COMPARE_BUTTON = 'input[id="add-to-compare-list-button-"]';
  private readonly PRODUCT_RATING = '.product-rating';
  private readonly REVIEWS_SECTION = '.product-reviews';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to product page
   */
  async navigateToProduct(productId: string): Promise<void> {
    await this.navigate(`p/${productId}`);
    await this.waitForElement(this.PRODUCT_NAME);
    console.log(`[INFO] Navigated to product: ${productId}`);
  }

  /**
   * Get product name
   */
  async getProductName(): Promise<string | null> {
    return await this.getText(this.PRODUCT_NAME);
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<number> {
    const priceText = await this.getText(this.PRODUCT_PRICE);
    return this._extractPrice(priceText || '0');
  }

  /**
   * Get product description
   */
  async getProductDescription(): Promise<string | null> {
    return await this.getText(this.PRODUCT_DESCRIPTION);
  }

  /**
   * Set quantity
   */
  async setQuantity(quantity: number): Promise<void> {
    await this.fill(this.QUANTITY_INPUT, String(quantity));
    console.log(`[INFO] Set quantity to: ${quantity}`);
  }

  /**
   * Get current quantity
   */
  async getQuantity(): Promise<number> {
    try {
      const value = await this.page.locator(this.QUANTITY_INPUT).inputValue();
      return parseInt(value) || 1;
    } catch {
      return 1;
    }
  }

  /**
   * Click add to cart button
   */
  async clickAddToCart(): Promise<void> {
    const isEnabled = await this.isEnabled(this.ADD_TO_CART_BUTTON);
    if (!isEnabled) {
      console.log('[WARN] Add to cart button is disabled');
      return;
    }
    await this.click(this.ADD_TO_CART_BUTTON);
    await this.waitForPageLoad();
  }

  /**
   * Add product to cart with quantity
   */
  async addToCart(quantity: number = 1): Promise<void> {
    await this.setQuantity(quantity);
    await this.clickAddToCart();
    console.log(`[INFO] Added ${quantity} item(s) to cart`);
  }

  /**
   * Check if product is out of stock
   */
  async isOutOfStock(): Promise<boolean> {
    return await this.isVisible(this.OUT_OF_STOCK_LABEL);
  }

  /**
   * Check if product is in stock
   */
  async isInStock(): Promise<boolean> {
    return await this.isVisible(this.IN_STOCK_LABEL);
  }

  /**
   * Check if add to cart is enabled
   */
  async isAddToCartEnabled(): Promise<boolean> {
    return await this.isEnabled(this.ADD_TO_CART_BUTTON);
  }

  /**
   * Add to wishlist
   */
  async addToWishlist(): Promise<void> {
    await this.click(this.WISHLIST_BUTTON);
    console.log('[INFO] Added to wishlist');
  }

  /**
   * Add to comparison
   */
  async addToComparison(): Promise<void> {
    await this.click(this.COMPARE_BUTTON);
    console.log('[INFO] Added to comparison');
  }

  /**
   * Get product rating
   */
  async getProductRating(): Promise<string | null> {
    return await this.getText(this.PRODUCT_RATING);
  }

  /**
   * Check if reviews section exists
   */
  async hasReviews(): Promise<boolean> {
    return await this.isVisible(this.REVIEWS_SECTION);
  }

  /**
   * Extract price from text
   */
  private _extractPrice(priceText: string): number {
    const match = priceText.replace(/,/g, '').match(/\d+\.?\d*/);
    return match ? parseFloat(match[0]) : 0;
  }
}