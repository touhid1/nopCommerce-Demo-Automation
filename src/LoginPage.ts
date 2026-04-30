import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {
  private readonly EMAIL_INPUT = 'input[id="Email"]';
  private readonly PASSWORD_INPUT = 'input[id="Password"]';
  private readonly LOGIN_BUTTON = 'input[type="submit"][value="Log in"]';
  private readonly REMEMBER_ME_CHECKBOX = 'input[id="RememberMe"]';
  private readonly ERROR_MESSAGE = '.message-error';
  private readonly LOGIN_FORM = '.login-page';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate('login');
    await this.waitForElement(this.LOGIN_FORM);
    console.log('[INFO] Navigated to login page');
  }


  async enterEmail(email: string): Promise<void> {
    await this.fill(this.EMAIL_INPUT, email);
  }

 
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.PASSWORD_INPUT, password);
  }

  async checkRememberMe(): Promise<void> {
    const isChecked = await this.isChecked(this.REMEMBER_ME_CHECKBOX);
    if (!isChecked) {
      await this.click(this.REMEMBER_ME_CHECKBOX);
    }
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.LOGIN_BUTTON);
    await this.waitForPageLoad();
  }

  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.navigateToLogin();
    await this.enterEmail(email);
    await this.enterPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickLoginButton();
  }


  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.ERROR_MESSAGE);
  }


  async getErrorMessage(): Promise<string | null> {
    return await this.getText(this.ERROR_MESSAGE);
  }

  async isLoginSuccessful(): Promise<boolean> {
    try {
      const logoutLink = 'a:has-text("Log out")';
      return await this.isVisible(logoutLink);
    } catch {
      return false;
    }
  }

  async verifyRememberMeCookie(): Promise<boolean> {
    const cookies = await this.page.context().cookies();
    eturn cookies.some(cookie => cookie.name.toLowerCase().includes('remember'));
  }
}