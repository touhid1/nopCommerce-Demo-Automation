import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage Object
 * Handles shopping cart operations
 */
export class CartPage extends BasePage {
  // Selectors
  private readonly CART_ITEM = 'tr.cart-item-row';
  private readonly ITEM_NAME = 'td:nth-child(2)';
  private readonly ITEM_QUANTITY = 'input[class="qty-input"]';
  private readonly ITEM_PRICE = 'td:nth-child(4)';
  private readonly ITEM_REMOVE_BUTTON = 'input[class="remove-btn"]';
  private readonly CART_SUBTOTAL = '.order-subtotal';
  private readonly CART_SHIPPING = '.shipping-cost';
  private readonly CART_TAX = '.tax-total';
  private readonly CART_TOTAL = '.total-price';
  private readonly CHECKOUT_BUTTON = 'input[value="Checkout"]';
  private readonly CONTINUE_SHOPPING = 'input[value="Continue Shopping"]';
  private readonly EMPTY_CART_MESSAGE = '.no-data';
  private readonly UPDATE_CART_BUTTON = 'input[value="Update shopping cart"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to cart
   */
  async navigateToCart(): Promise<void> {
    await this.navigate('cart');
    await this.waitForPageLoad();
    console.log('[INFO] Navigated to cart');
  }

  /**
   * Get number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    try {
      const items = await this.page.locator(this.CART_ITEM).all();
      return items.length;
    } catch {
      return 0;
    }
  }

  /**
   * Get all cart items
   */
  async getAllCartItems(): Promise<Array<{ name: string; quantity: number; price: string }>> {
    const itemsData: Array<{ name: string; quantity: number; price: string }> = [];
    const items = await this.page.locator(this.CART_ITEM).all();

    for (const item of items) {
      try {
        const nameElem = await item.locator(this.ITEM_NAME).textContent();
        const qtyElem = await item.locator(this.ITEM_QUANTITY).inputValue();
        const priceElem = await item.locator(this.ITEM_PRICE).textContent();

        if (nameElem) {
          itemsData.push({
            name: nameElem.trim(),
            quantity: qtyElem ? parseInt(qtyElem) : 1,
            price: priceElem?.trim() || '0',
          });
        }
      } catch (error) {
        console.log(`[ERROR] Error parsing cart item: ${error}`);
      }
    }

    return itemsData;
  }

  /**
   * Update item quantity
   */
  async updateItemQuantity(productName: string, newQuantity: number): Promise<boolean> {
    const items = await this.page.locator(this.CART_ITEM).all();

    for (const item of items) {
      const text = await item.textContent();
      if (text && text.includes(productName)) {
        const qtyInput = await item.locator(this.ITEM_QUANTITY);
        if (qtyInput) {
          await qtyInput.fill(String(newQuantity));
          
          if (await this.isVisible(this.UPDATE_CART_BUTTON)) {
            await this.click(this.UPDATE_CART_BUTTON);
            await this.waitForPageLoad();
          }
          console.log(`[INFO] Updated ${productName} quantity to ${newQuantity}`);
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Remove item from cart
   */
  async removeItemFromCart(productName: string): Promise<boolean> {
    const items = await this.page.locator(this.CART_ITEM).all();

    for (const item of items) {
      const text = await item.textContent();
      if (text && text.includes(productName)) {
        const removeBtn = await item.locator(this.ITEM_REMOVE_BUTTON);
        if (removeBtn) {
          await removeBtn.click();
          await this.waitForPageLoad();
          console.log(`[INFO] Removed ${productName} from cart`);
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Get cart subtotal
   */
  async getCartSubtotal(): Promise<number> {
    try {
      const subtotalText = await this.getText(this.CART_SUBTOTAL);
      return this._extractPrice(subtotalText || '0');
    } catch {
      return 0;
    }
  }

  /**
   * Get shipping cost
   */
  async getCartShipping(): Promise<number> {
    try {
      const shippingText = await this.getText(this.CART_SHIPPING);
      return this._extractPrice(shippingText || '0');
    } catch {
      return 0;
    }
  }

  /**
   * Get tax amount
   */
  async getCartTax(): Promise<number> {
    try {
      const taxText = await this.getText(this.CART_TAX);
      return this._extractPrice(taxText || '0');
    } catch {
      return 0;
    }
  }

  /**
   * Get cart total
   */
  async getCartTotal(): Promise<number> {
    try {
      const totalText = await this.getText(this.CART_TOTAL);
      return this._extractPrice(totalText || '0');
    } catch {
      return 0;
    }
  }

  /**
   * Get cart summary
   */
  async getCartSummary(): Promise<{
    itemCount: number;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }> {
    return {
      itemCount: await this.getCartItemCount(),
      subtotal: await this.getCartSubtotal(),
      shipping: await this.getCartShipping(),
      tax: await this.getCartTax(),
      total: await this.getCartTotal(),
    };
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.click(this.CHECKOUT_BUTTON);
    await this.waitForPageLoad();
    console.log('[INFO] Proceeded to checkout');
  }

  /**
   * Continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.click(this.CONTINUE_SHOPPING);
    await this.waitForPageLoad();
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return await this.isVisible(this.EMPTY_CART_MESSAGE);
  }

  /**
   * Extract price from text
   */
  private _extractPrice(priceText: string): number {
    const match = priceText.replace(/,/g, '').match(/\d+\.?\d*/);
    return match ? parseFloat(match[0]) : 0;
  }
}