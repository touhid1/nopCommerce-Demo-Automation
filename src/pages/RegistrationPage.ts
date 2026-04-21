import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


//Registration Page Object
//Handles all registration-related interactions
 
export class RegistrationPage extends BasePage {
  // Selectors
  private readonly FIRST_NAME_INPUT = 'input[id*="FirstName"]';
  private readonly LAST_NAME_INPUT = 'input[id*="LastName"]';
  private readonly EMAIL_INPUT = 'input[id*="Email"]';
  private readonly COMPANY_INPUT = 'input[id*="Company"]';
  private readonly STREET_ADDRESS_INPUT = 'input[id*="Address1"]';
  private readonly CITY_INPUT = 'input[id*="City"]';
  private readonly STATE_SELECT = 'select[id*="StateProvinceId"]';
  private readonly COUNTRY_SELECT = 'select[id*="CountryId"]';
  private readonly ZIP_INPUT = 'input[id*="ZipPostalCode"]';
  private readonly PASSWORD_INPUT = 'input[id*="Password"]';
  private readonly CONFIRM_PASSWORD_INPUT = 'input[id*="ConfirmPassword"]';
  private readonly NEWSLETTER_CHECKBOX = 'input[id*="Newsletter"]';
  private readonly REGISTER_BUTTON = 'button:has-text("Register")';
  private readonly ERROR_MESSAGE = '[class*="error"], [class*="validation"]';

  constructor(page: Page) {
    super(page);
  }

  
 //Navigate to registration page
   
  async navigateToRegistration(): Promise<void> {
    await this.navigate('register');
    await this.waitForElement(this.FIRST_NAME_INPUT);
    this.logger.info('Registration page loaded successfully');
  }

  
 //Fill personal details section
   
  async fillPersonalDetails(firstName: string, lastName: string): Promise<void> {
    await this.fill(this.FIRST_NAME_INPUT, firstName, 'First Name');
    await this.fill(this.LAST_NAME_INPUT, lastName, 'Last Name');
  }

  
 //Fill address details section
   
  async fillAddressDetails(
    company: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string = 'United States'
  ): Promise<void> {
    await this.fill(this.COMPANY_INPUT, company, 'Company');
    await this.fill(this.STREET_ADDRESS_INPUT, street, 'Street Address');
    await this.fill(this.CITY_INPUT, city, 'City');
    await this.selectDropdown(this.COUNTRY_SELECT, country);
    await this.selectDropdown(this.STATE_SELECT, state);
    await this.fill(this.ZIP_INPUT, zipCode, 'ZIP Code');
  }

  
 //Fill password details section
   
  async fillPasswordDetails(email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fill(this.EMAIL_INPUT, email, 'Email');
    await this.fill(this.PASSWORD_INPUT, password, 'Password');
    await this.fill(this.CONFIRM_PASSWORD_INPUT, confirmPassword, 'Confirm Password');
  }

  
 //Check newsletter subscription checkbox
   
  async checkNewsletter(): Promise<void> {
    const isChecked = await this.isChecked(this.NEWSLETTER_CHECKBOX);
    if (!isChecked) {
      await this.click(this.NEWSLETTER_CHECKBOX, 'Newsletter Checkbox');
    }
  }

  
 //Click register button
   
  async submitRegistration(): Promise<void> {
    await this.click(this.REGISTER_BUTTON, 'Register Button');
  }

  
 //Complete full registration flow
   
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
    country: string = 'United States'
  ): Promise<void> {
    await this.navigateToRegistration();
    await this.fillPersonalDetails(firstName, lastName);
    await this.fillAddressDetails(company, street, city, state, zipCode, country);
    await this.fillPasswordDetails(email, password, password);
    await this.checkNewsletter();
    await this.submitRegistration();
  }

  
 //Get error message
   
  async getErrorMessage(): Promise<string | null> {
    try {
      return await this.getText(this.ERROR_MESSAGE);
    } catch {
      return null;
    }
  }

  
 //Check if error is displayed
   
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.ERROR_MESSAGE);
  }

  
 //Check if password error is displayed
   
  async isPasswordErrorDisplayed(): Promise<boolean> {
    const passwordError = 'input[id*="Password"][class*="error"], [class*="field-validation-error"]';
    return await this.isVisible(passwordError);
  }

  
 //Check if email error is displayed
   
  async isEmailErrorDisplayed(): Promise<boolean> {
    const emailError = 'input[id*="Email"][class*="error"], span:has-text("email")';
    return await this.isVisible(emailError);
  }

  
 //Check if registration was successful
   
  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      await this.waitForURL(/.*customer., 5000);
      const dashboardHeader = await this.isVisible('h1:has-text("My Account")');
      return dashboardHeader;
    } catch {
      return false;
    }
  }
}