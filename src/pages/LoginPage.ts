import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

// Login Page Object
// Handles all login-related interactions
export class LoginPage extends BasePage {
  // Selectors
  private readonly EMAIL_INPUT = 'input[class*="email"]';
  private readonly PASSWORD_INPUT = 'input[type="password"]';
  private readonly LOGIN_BUTTON =
    'button:has-text("Log in"), button:has-text("LOGIN")';
  private readonly REMEMBER_ME_CHECKBOX = 'input[type="checkbox"]';
  private readonly ERROR_MESSAGE =
    '[class*="error"], .message-error, [role="alert"]';

  constructor(page: Page) {
    super(page);
  }

  // Navigate to login page

  async navigateToLogin(): Promise<void> {
    await this.navigate("login");
    await this.waitForElement(this.EMAIL_INPUT);
    this.logger.info("Login page loaded successfully");
  }

  // Enter email address

  async enterEmail(email: string): Promise<void> {
    await this.fill(this.EMAIL_INPUT, email, "Email");
  }

  // Enter password

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.PASSWORD_INPUT, password, "Password");
  }

  // Check remember me checkbox

  async checkRememberMe(): Promise<void> {
    const isChecked = await this.isChecked(this.REMEMBER_ME_CHECKBOX);
    if (!isChecked) {
      await this.click(this.REMEMBER_ME_CHECKBOX, "Remember Me");
    }
  }

  // Click login button

  async clickLoginButton(): Promise<void> {
    await this.click(this.LOGIN_BUTTON, "Login Button");
  }

  // Complete login flow

  async login(
    email: string,
    password: string,
    rememberMe: boolean = false,
  ): Promise<void> {
    await this.navigateToLogin();
    await this.enterEmail(email);
    await this.enterPassword(password);

    if (rememberMe) {
      await this.checkRememberMe();
    }

    await this.clickLoginButton();
  }

  // Check if error message is displayed

  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.ERROR_MESSAGE);
  }

  // Get error message text

  async getErrorMessage(): Promise<string | null> {
    try {
      return await this.getText(this.ERROR_MESSAGE);
    } catch {
      return null;
    }
  }

  // Check if login was successful (redirect to dashboard)

  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.waitForURL(/.*customer.*/, 5000);
      return true;
    } catch {
      return false;
    }
  }

  // Verify remember me cookie exists

  async verifyRememberMeCookie(): Promise<boolean> {
    const cookies = await this.page.context().cookies();
    return cookies.some((cookie) =>
      cookie.name.toLowerCase().includes("remember"),
    );
  }
}
