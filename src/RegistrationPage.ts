import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  private readonly FIRST_NAME_INPUT = 'input[id="FirstName"]';
  private readonly LAST_NAME_INPUT = 'input[id="LastName"]';
  private readonly EMAIL_INPUT = 'input[id="Email"]';
  private readonly COMPANY_INPUT = 'input[id="Company"]';
  private readonly STREET_ADDRESS_INPUT = 'input[id="Address1"]';
  private readonly CITY_INPUT = 'input[id="City"]';
  private readonly STATE_SELECT = 'select[id="StateProvinceId"]';
  private readonly COUNTRY_SELECT = 'select[id="CountryId"]';
  private readonly ZIP_CODE_INPUT = 'input[id="ZipPostalCode"]';
  private readonly PASSWORD_INPUT = 'input[id="Password"]';
  private readonly CONFIRM_PASSWORD_INPUT = 'input[id="ConfirmPassword"]';
  private readonly REGISTER_BUTTON = 'input[type="submit"][value="Register"]';
  private readonly ERROR_MESSAGE = ".message-error, .field-validation-error";
  private readonly SUCCESS_MESSAGE = ".result";
  private readonly REGISTRATION_FORM = ".register-page";

  constructor(page: Page) {
    super(page);
  }

  async navigateToRegistration(): Promise<void> {
    await this.navigate("register");
    await this.waitForElement(this.REGISTRATION_FORM);
    console.log("[INFO] Navigated to registration page");
  }

  async fillPersonalDetails(
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this.fill(this.FIRST_NAME_INPUT, firstName);
    await this.fill(this.LAST_NAME_INPUT, lastName);
  }

  async fillAddressDetails(
    company: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string = "United States",
  ): Promise<void> {
    await this.fill(this.COMPANY_INPUT, company);
    await this.fill(this.STREET_ADDRESS_INPUT, street);
    await this.fill(this.CITY_INPUT, city);
    await this.selectDropdown(this.COUNTRY_SELECT, country);
    await this.selectDropdown(this.STATE_SELECT, state);
    await this.fill(this.ZIP_CODE_INPUT, zipCode);
  }

  async fillPasswordDetails(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<void> {
    await this.fill(this.EMAIL_INPUT, email);
    await this.fill(this.PASSWORD_INPUT, password);
    await this.fill(this.CONFIRM_PASSWORD_INPUT, confirmPassword);
  }

  async submitRegistration(): Promise<void> {
    await this.click(this.REGISTER_BUTTON);
    await this.waitForPageLoad();
  }

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    company: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string = "United States",
  ): Promise<void> {
    await this.navigateToRegistration();
    await this.fillPersonalDetails(firstName, lastName);
    await this.fillAddressDetails(
      company,
      street,
      city,
      state,
      zipCode,
      country,
    );
    await this.fillPasswordDetails(email, password, password);
    await this.submitRegistration();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.getText(this.ERROR_MESSAGE);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.ERROR_MESSAGE);
  }

  async isPasswordErrorDisplayed(): Promise<boolean> {
    const passwordError = 'span:has-text("Password")';
    return await this.isVisible(passwordError);
  }

  async isEmailErrorDisplayed(): Promise<boolean> {
    const emailError = 'span:has-text("Email")';
    return await this.isVisible(emailError);
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      const text = await this.getText(this.SUCCESS_MESSAGE);
      return text?.toLowerCase().includes("success") || false;
    } catch {
      return false;
    }
  }

  async getSuccessMessage(): Promise<string | null> {
    return await this.getText(this.SUCCESS_MESSAGE);
  }
}
