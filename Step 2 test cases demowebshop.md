# STEP 2: TEST CASE DEFINITION

## DemoWebShop - Complete Test Case Specifications

### 📊 TEST CASE COVERAGE: 32+ TESTS (Exceeds 24 Minimum)

---

## 🔐 FEATURE 1: USER REGISTRATION (6 Tests)

### **TC_REG_001: Valid Registration - Happy Path**

| Attribute           | Value                                                                                                                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                                                                                                                                                                                                                                                  |
| **Type**            | Positive (Happy Path)                                                                                                                                                                                                                                                                                                     |
| **Precondition**    | User is on registration page and not logged in                                                                                                                                                                                                                                                                            |
| **Steps**           | 1. Enter first name: "John" 2. Enter last name: "Doe" 3. Enter email: "john.doe.{timestamp}@test.com" 4. Select gender: "Male" 5. Enter date of birth: "01/15/1990" 6. Enter company: "TechCorp" 7. Enter password: "Test@1234" 8. Confirm password: "Test@1234" 9. Check newsletter checkbox 10. Click "Register" button |
| **Expected Result** | ✅ Registration successful, user redirected to dashboard with success message "Your registration completed"                                                                                                                                                                                                               |
| **Test Data**       | Email: Random generated, Password: Test@1234                                                                                                                                                                                                                                                                              |
| **Screenshots**     | success_page.png, confirmation_message.png                                                                                                                                                                                                                                                                                |

---

### **TC_REG_002: Invalid Email Format - Fail Case**

| Attribute           | Value                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                                  |
| **Type**            | Negative (Fail Case)                                                                                  |
| **Precondition**    | User is on registration page                                                                          |
| **Steps**           | 1. Fill all fields with valid data 2. Enter email: "invalidemail.com" (missing @) 3. Click "Register" |
| **Expected Result** | ❌ Error message displayed: "Please enter a valid email address" 4. Form persists with entered data   |
| **Test Data**       | Invalid emails: "test", "test@", "@test.com", "test@domain"                                           |
| **Screenshots**     | error_message.png                                                                                     |

---

### **TC_REG_003: Weak Password - Fail Case**

| Attribute           | Value                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                                                  |
| **Type**            | Negative (Fail Case)                                                                                                  |
| **Precondition**    | User is on registration page                                                                                          |
| **Steps**           | 1. Fill all fields with valid data 2. Enter password: "123" (too weak) 3. Confirm password: "123" 4. Click "Register" |
| **Expected Result** | ❌ Error message: "Password must be at least 6 characters" or similar validation error                                |
| **Test Data**       | Weak passwords: "1", "12", "123", "pass", "Password"                                                                  |
| **Screenshots**     | password_error.png                                                                                                    |

---

### **TC_REG_004: Duplicate Email - Edge Case**

| Attribute           | Value                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| **Priority**        | High                                                                                                   |
| **Type**            | Edge Case                                                                                              |
| **Precondition**    | Email "existing.user@test.com" is already registered                                                   |
| **Steps**           | 1. Fill registration form with valid data 2. Enter email: "existing.user@test.com" 3. Click "Register" |
| **Expected Result** | ❌ Error message: "The email address is already registered" or "That email is already in use"          |
| **Test Data**       | Existing email: existing.user@test.com                                                                 |
| **Screenshots**     | duplicate_email_error.png                                                                              |

---

### **TC_REG_005: Special Characters in Name - Edge Case**

| Attribute           | Value                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                                   |
| **Type**            | Edge Case                                                                                                |
| **Precondition**    | User is on registration page                                                                             |
| **Steps**           | 1. Enter first name: "Jean-Paul" 2. Enter last name: "O'Connor" 3. Complete registration with valid data |
| **Expected Result** | ✅ Registration succeeds OR ❌ Clear error if special chars not allowed                                  |
| **Test Data**       | Names with hyphens and apostrophes                                                                       |
| **Screenshots**     | special_chars_result.png                                                                                 |

---

### **TC_REG_006: SQL Injection Protection - Security**

| Attribute           | Value                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                                                         |
| **Type**            | Security Test                                                                                                                    |
| **Precondition**    | User is on registration page                                                                                                     |
| **Steps**           | 1. Enter first name: "'; DROP TABLE users;--" 2. Complete registration with injection attempt in email field 3. Click "Register" |
| **Expected Result** | ✅ Injection blocked, registration fails with validation error, NO database error visible, data safely rejected                  |
| **Test Data**       | SQL Injection: "' OR '1'='1", "admin'--", "'; DROP TABLE--"                                                                      |
| **Screenshots**     | security_test_result.png                                                                                                         |

---

## 🔑 FEATURE 2: USER LOGIN (7 Tests)

### **TC_LOGIN_001: Valid Login - Happy Path**

| Attribute           | Value                                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                                                                              |
| **Type**            | Positive (Happy Path)                                                                                                                                 |
| **Precondition**    | User account exists with email "testuser@test.com" and password "Test@1234"                                                                           |
| **Steps**           | 1. Navigate to login page 2. Enter email: "testuser@test.com" 3. Enter password: "Test@1234" 4. Check "Remember me" checkbox 5. Click "Log in" button |
| **Expected Result** | ✅ Login successful, user redirected to account dashboard, "Log out" link visible                                                                     |
| **Test Data**       | Valid credentials from database                                                                                                                       |
| **Screenshots**     | dashboard.png, logout_link_visible.png                                                                                                                |

---

### **TC_LOGIN_002: Wrong Password - Fail Case**

| Attribute           | Value                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                                                  |
| **Type**            | Negative (Fail Case)                                                                                                  |
| **Precondition**    | User account exists                                                                                                   |
| **Steps**           | 1. Navigate to login page 2. Enter email: "testuser@test.com" 3. Enter password: "WrongPassword123" 4. Click "Log in" |
| **Expected Result** | ❌ Error message: "The email address or password provided is incorrect" or "Login failed"                             |
| **Test Data**       | Wrong password: WrongPassword123                                                                                      |
| **Screenshots**     | login_error.png                                                                                                       |

---

### **TC_LOGIN_003: Non-existent User - Fail Case**

| Attribute           | Value                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                                |
| **Type**            | Negative (Fail Case)                                                                                |
| **Precondition**    | Login page is accessible                                                                            |
| **Steps**           | 1. Enter email: "nonexistent.user.123456@test.com" 2. Enter password: "Test@1234" 3. Click "Log in" |
| **Expected Result** | ❌ Generic error message (no info about which field is wrong for security)                          |
| **Test Data**       | Non-existent email: nonexistent.user.123456@test.com                                                |
| **Screenshots**     | not_found_error.png                                                                                 |

---

### **TC_LOGIN_004: SQL Injection in Email - Security**

| Attribute           | Value                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                    |
| **Type**            | Security Test                                                                               |
| **Precondition**    | Login page is accessible                                                                    |
| **Steps**           | 1. Enter email: "admin'--" or "' OR '1'='1" 2. Enter password: "anything" 3. Click "Log in" |
| **Expected Result** | ✅ Login fails safely, no database errors visible, injection blocked                        |
| **Test Data**       | SQL injections in email field                                                               |
| **Screenshots**     | sql_injection_blocked.png                                                                   |

---

### **TC_LOGIN_005: XSS Prevention - Security**

| Attribute           | Value                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                                                         |
| **Type**            | Security Test                                                                                                                    |
| **Precondition**    | Login page is accessible                                                                                                         |
| **Steps**           | 1. Enter email: "<script>alert('XSS')</script>@test.com" 2. Enter password: "<img src=x onerror=alert('XSS')>" 3. Click "Log in" |
| **Expected Result** | ✅ No script execution, login fails with validation error, page safe                                                             |
| **Test Data**       | XSS payloads: script tags, img tags with onerror                                                                                 |
| **Screenshots**     | xss_prevented.png                                                                                                                |

---

### **TC_LOGIN_006: Email Case Sensitivity - Edge Case**

| Attribute           | Value                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                      |
| **Type**            | Edge Case                                                                                   |
| **Precondition**    | User registered with "TestUser@Test.com"                                                    |
| **Steps**           | 1. Enter email: "testuser@test.com" (lowercase) 2. Enter correct password 3. Click "Log in" |
| **Expected Result** | ✅ Login succeeds (email should be case-insensitive) OR ❌ Clear error if case-sensitive    |
| **Test Data**       | Case variations: TESTUSER@TEST.COM, TestUser@Test.com                                       |
| **Screenshots**     | case_sensitivity_result.png                                                                 |

---

### **TC_LOGIN_007: Empty Field Validation - Edge Case**

| Attribute           | Value                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                                          |
| **Type**            | Edge Case                                                                                                     |
| **Precondition**    | Login page is loaded                                                                                          |
| **Steps**           | 1. Leave email field empty 2. Leave password field empty 3. Click "Log in"                                    |
| **Expected Result** | ❌ Validation error: "Email is required" and "Password is required" OR browser validation prevents submission |
| **Test Data**       | Empty fields                                                                                                  |
| **Screenshots**     | validation_errors.png                                                                                         |

---

## 🔍 FEATURE 3: PRODUCT SEARCH & FILTERING (8 Tests)

### **TC_SEARCH_001: Valid Product Search - Happy Path**

| Attribute           | Value                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                                 |
| **Type**            | Positive (Happy Path)                                                                                    |
| **Precondition**    | User is on homepage, products exist in database                                                          |
| **Steps**           | 1. Click search field 2. Type "Laptop" 3. Press Enter OR click search button 4. View results             |
| **Expected Result** | ✅ Search results page displayed with products matching "Laptop", product count shown, results paginated |
| **Test Data**       | Search term: "Laptop" (known product)                                                                    |
| **Screenshots**     | search_results.png, product_list.png                                                                     |

---

### **TC_SEARCH_002: No Results Found - Fail Case**

| Attribute           | Value                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                |
| **Type**            | Negative (Fail Case)                                                                |
| **Precondition**    | User is on homepage                                                                 |
| **Steps**           | 1. Search for: "XYZNONEXISTENT12345PRODUCT" 2. Submit search                        |
| **Expected Result** | ✅ Search results page shows "No products found" or "No results" message gracefully |
| **Test Data**       | Non-existent product: XYZNONEXISTENT12345PRODUCT                                    |
| **Screenshots**     | no_results_page.png                                                                 |

---

### **TC_SEARCH_003: Special Characters in Search - Edge Case**

| Attribute           | Value                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                              |
| **Type**            | Edge Case                                                                                           |
| **Precondition**    | User is on homepage                                                                                 |
| **Steps**           | 1. Search for: "USB-C & Cable" 2. Search for: "PC (Desktop)" 3. Search for: "$Price"                |
| **Expected Result** | ✅ Search handles special characters safely, results shown if product exists OR proper error if not |
| **Test Data**       | Special characters: "-", "&", "()", "$", "@", "#"                                                   |
| **Screenshots**     | special_chars_search.png                                                                            |

---

### **TC_SEARCH_004: Price Filter - Feature Test**

| Attribute           | Value                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Priority**        | High                                                                                                                           |
| **Type**            | Feature Test                                                                                                                   |
| **Precondition**    | Search results are displayed                                                                                                   |
| **Steps**           | 1. In search results, set minimum price: "$100" 2. Set maximum price: "$500" 3. Click "Filter" button 4. View filtered results |
| **Expected Result** | ✅ Results filtered to show only products between $100-$500, filter tags visible, accurate price range                         |
| **Test Data**       | Min: $100, Max: $500                                                                                                           |
| **Screenshots**     | filtered_results.png, price_filter_applied.png                                                                                 |

---

### **TC_SEARCH_005: Pagination - Edge Case**

| Attribute           | Value                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                                                                             |
| **Type**            | Edge Case                                                                                                                                          |
| **Precondition**    | Search results show multiple pages                                                                                                                 |
| **Steps**           | 1. Search for common term (multiple results) 2. Click "Next" button 3. Verify page 2 content 4. Click "Previous" 5. Verify page 1 content restored |
| **Expected Result** | ✅ Navigation works, page numbers update, products change correctly, no data loss                                                                  |
| **Test Data**       | Pagination navigation                                                                                                                              |
| **Screenshots**     | page_2.png, page_1_restored.png                                                                                                                    |

---

### **TC_SEARCH_006: Sorting - Feature Test**

| Attribute           | Value                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                               |
| **Type**            | Feature Test                                                                                         |
| **Precondition**    | Search results are displayed                                                                         |
| **Steps**           | 1. Look at sort dropdown 2. Select "Price: Low to High" 3. Verify products sorted by price ascending |
| **Expected Result** | ✅ Products sorted correctly by selected criteria, prices increase from top to bottom                |
| **Test Data**       | Sort options: Price High-Low, Newest, Best Selling                                                   |
| **Screenshots**     | sorted_results.png                                                                                   |

---

### **TC_SEARCH_007: Clear Filters - Feature Test**

| Attribute           | Value                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                               |
| **Type**            | Feature Test                                                                                         |
| **Precondition**    | Filters are applied to search results                                                                |
| **Steps**           | 1. Apply price filter ($100-$500) 2. Click "Clear Filters" button 3. Verify all products shown again |
| **Expected Result** | ✅ Filters removed, all search results shown, no orphaned filter tags                                |
| **Test Data**       | Filter clearing                                                                                      |
| **Screenshots**     | filters_cleared.png, all_products_shown.png                                                          |

---

### **TC_SEARCH_008: Search Term Persistence - Edge Case**

| Attribute           | Value                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | Low                                                                                                                 |
| **Type**            | Edge Case                                                                                                           |
| **Precondition**    | User is on search results                                                                                           |
| **Steps**           | 1. Search for "Laptop" 2. Click on a product 3. Go back to search results 4. Verify search term still in search box |
| **Expected Result** | ✅ Search term "Laptop" still visible in search field, pagination/filters preserved                                 |
| **Test Data**       | Search term: Laptop                                                                                                 |
| **Screenshots**     | search_persistence.png                                                                                              |

---

## 📦 FEATURE 4: PRODUCT DETAILS & ADD TO CART (6 Tests)

### **TC_PRODUCT_001: View Product Details - Happy Path**

| Attribute           | Value                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                      |
| **Type**            | Positive                                                                                  |
| **Precondition**    | Product exists in catalog                                                                 |
| **Steps**           | 1. Search for and click on a product 2. View product page 3. Verify all details displayed |
| **Expected Result** | ✅ Product name, price, description, stock status, reviews, rating all visible            |
| **Test Data**       | Any valid product                                                                         |
| **Screenshots**     | product_page.png                                                                          |

---

### **TC_PRODUCT_002: Add to Cart - Happy Path**

| Attribute           | Value                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                          |
| **Type**            | Positive                                                                                          |
| **Precondition**    | User is on product page, product is in stock                                                      |
| **Steps**           | 1. Set quantity to "2" 2. Click "Add to cart" button 3. Verify confirmation                       |
| **Expected Result** | ✅ Product added to cart, notification shown "Product added to shopping cart", cart count updated |
| **Test Data**       | Quantity: 2                                                                                       |
| **Screenshots**     | add_to_cart_success.png, cart_updated.png                                                         |

---

### **TC_PRODUCT_003: Out of Stock - Fail Case**

| Attribute           | Value                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                  |
| **Type**            | Negative                                                                              |
| **Precondition**    | Product is out of stock                                                               |
| **Steps**           | 1. View out-of-stock product 2. Try to click "Add to cart"                            |
| **Expected Result** | ❌ Add to cart button disabled/hidden OR error message "This product is out of stock" |
| **Test Data**       | Out-of-stock product                                                                  |
| **Screenshots**     | out_of_stock.png                                                                      |

---

### **TC_PRODUCT_004: Quantity Limit - Edge Case**

| Attribute           | Value                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| **Priority**        | Medium                                                                   |
| **Type**            | Edge Case                                                                |
| **Precondition**    | User is on product page                                                  |
| **Steps**           | 1. Set quantity to "999" (exceeds realistic limit) 2. Try to add to cart |
| **Expected Result** | ✅ Either allow with warning OR show error "Maximum quantity is X"       |
| **Test Data**       | Extreme quantity: 999                                                    |
| **Screenshots**     | quantity_limit_result.png                                                |

---

### **TC_PRODUCT_005: Add to Wishlist - Feature Test**

| Attribute           | Value                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                           |
| **Type**            | Feature                                                                          |
| **Precondition**    | User is logged in, on product page                                               |
| **Steps**           | 1. Click "Add to Wishlist" button 2. Verify button state changes                 |
| **Expected Result** | ✅ Product added to wishlist, button shows "Remove from Wishlist" or ✓ indicator |
| **Test Data**       | Product wishlist action                                                          |
| **Screenshots**     | added_to_wishlist.png                                                            |

---

### **TC_PRODUCT_006: Price Accuracy - Validation**

| Attribute           | Value                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                            |
| **Type**            | Validation                                                                                          |
| **Precondition**    | User adds product to cart and goes to cart                                                          |
| **Steps**           | 1. Add product with price $29.99 to cart 2. Go to cart 3. Verify price in cart matches product page |
| **Expected Result** | ✅ Cart price = Product page price, subtotal calculated correctly                                   |
| **Test Data**       | Price verification                                                                                  |
| **Screenshots**     | price_match.png                                                                                     |

---

## 🛒 FEATURE 5: SHOPPING CART (6 Tests)

### **TC_CART_001: View Cart Items - Happy Path**

| Attribute           | Value                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| **Priority**        | Critical                                                                 |
| **Type**            | Positive                                                                 |
| **Precondition**    | User has items in cart                                                   |
| **Steps**           | 1. Click shopping cart icon 2. View cart page 3. Verify all items listed |
| **Expected Result** | ✅ All cart items shown with name, price, quantity, total per item       |
| **Test Data**       | Multiple items in cart                                                   |
| **Screenshots**     | cart_items.png                                                           |

---

### **TC_CART_002: Update Quantity - Happy Path**

| Attribute           | Value                                                                         |
| ------------------- | ----------------------------------------------------------------------------- |
| **Priority**        | High                                                                          |
| **Type**            | Positive                                                                      |
| **Precondition**    | Product is in cart with quantity 1                                            |
| **Steps**           | 1. Change quantity from 1 to 3 2. Click "Update" 3. Verify cart total updated |
| **Expected Result** | ✅ Quantity updated, subtotal and total recalculated correctly                |
| **Test Data**       | New quantity: 3                                                               |
| **Screenshots**     | quantity_updated.png, total_updated.png                                       |

---

### **TC_CART_003: Remove Item - Happy Path**

| Attribute           | Value                                                               |
| ------------------- | ------------------------------------------------------------------- |
| **Priority**        | High                                                                |
| **Type**            | Positive                                                            |
| **Precondition**    | Product is in cart                                                  |
| **Steps**           | 1. Click "Remove" button for product 2. Confirm removal             |
| **Expected Result** | ✅ Item removed from cart, cart count decreases, total recalculated |
| **Test Data**       | Item removal                                                        |
| **Screenshots**     | item_removed.png, cart_updated.png                                  |

---

### **TC_CART_004: Empty Cart - Edge Case**

| Attribute           | Value                                                         |
| ------------------- | ------------------------------------------------------------- |
| **Priority**        | Medium                                                        |
| **Type**            | Edge Case                                                     |
| **Precondition**    | User has items in cart                                        |
| **Steps**           | 1. Remove all items one by one 2. View cart                   |
| **Expected Result** | ✅ Empty cart message displayed "Your shopping cart is empty" |
| **Test Data**       | Remove all items                                              |
| **Screenshots**     | empty_cart.png                                                |

---

### **TC_CART_005: Cart Total Calculation - Validation**

| Attribute           | Value                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                                   |
| **Type**            | Validation                                                                                                 |
| **Precondition**    | Cart has multiple items                                                                                    |
| **Steps**           | 1. Add multiple products to cart 2. Verify: Subtotal = sum of all items, Total = Subtotal + Tax + Shipping |
| **Expected Result** | ✅ All calculations accurate, no rounding errors                                                           |
| **Test Data**       | Multiple products with tax/shipping                                                                        |
| **Screenshots**     | calculations.png                                                                                           |

---

### **TC_CART_006: Persist After Login - State Management**

| Attribute           | Value                                                                   |
| ------------------- | ----------------------------------------------------------------------- |
| **Priority**        | High                                                                    |
| **Type**            | State Management                                                        |
| **Precondition**    | User added items while logged out                                       |
| **Steps**           | 1. Add product to cart (logged out) 2. Login with account 3. Check cart |
| **Expected Result** | ✅ Cart items persist after login, no data loss                         |
| **Test Data**       | Cart persistence                                                        |
| **Screenshots**     | cart_persisted.png                                                      |

---

## ✅ FEATURE 6: CHECKOUT PROCESS (6 Tests)

### **TC_CHECKOUT_001: Complete Checkout - Happy Path**

| Attribute           | Value                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Priority**        | Critical                                                                                                                |
| **Type**            | Positive                                                                                                                |
| **Precondition**    | User has items in cart, is logged in                                                                                    |
| **Steps**           | 1. Click "Checkout" 2. Verify billing address 3. Select shipping method 4. Enter payment details 5. Click "Place Order" |
| **Expected Result** | ✅ Order completed successfully, order number shown, confirmation email sent                                            |
| **Test Data**       | Valid address, shipping, payment info                                                                                   |
| **Screenshots**     | order_confirmation.png, order_number.png                                                                                |

---

### **TC_CHECKOUT_002: Missing Required Field - Fail Case**

| Attribute           | Value                                                                      |
| ------------------- | -------------------------------------------------------------------------- |
| **Priority**        | High                                                                       |
| **Type**            | Negative                                                                   |
| **Precondition**    | User is at checkout                                                        |
| **Steps**           | 1. Leave required field blank (e.g., address) 2. Try to submit             |
| **Expected Result** | ❌ Error message: "This field is required" 4. Form persists for correction |
| **Test Data**       | Missing field submission                                                   |
| **Screenshots**     | validation_error.png                                                       |

---

### **TC_CHECKOUT_003: Invalid Payment Card - Fail Case**

| Attribute           | Value                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Priority**        | Critical                                                                                         |
| **Type**            | Negative                                                                                         |
| **Precondition**    | User is at payment step                                                                          |
| **Steps**           | 1. Enter invalid card: "1111111111111111" 2. Enter expiry: "01/25" 3. Enter CVV: "000" 4. Submit |
| **Expected Result** | ❌ Payment declined, error message shown, user can retry or change payment method                |
| **Test Data**       | Test card: 4111111111111111 (valid test card for most systems)                                   |
| **Screenshots**     | payment_declined.png                                                                             |

---

### **TC_CHECKOUT_004: Shipping Method Selection - Feature**

| Attribute           | Value                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                        |
| **Type**            | Feature                                                                                     |
| **Precondition**    | User is at shipping step                                                                    |
| **Steps**           | 1. Select shipping method "Express" (costs more) 2. Verify total updated with shipping cost |
| **Expected Result** | ✅ Shipping cost added to total, different methods show different costs                     |
| **Test Data**       | Standard, Express, Overnight shipping                                                       |
| **Screenshots**     | shipping_selected.png, total_updated.png                                                    |

---

### **TC_CHECKOUT_005: Address Format Validation - Validation**

| Attribute           | Value                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                      |
| **Type**            | Validation                                                                                  |
| **Precondition**    | User is entering billing address                                                            |
| **Steps**           | 1. Enter invalid zip code: "ABC" (letters) 2. Enter valid zip: "10001" 3. Verify acceptance |
| **Expected Result** | ❌ Invalid zip rejected 3. ✅ Valid zip accepted                                            |
| **Test Data**       | Invalid: "ABC", Valid: "10001"                                                              |
| **Screenshots**     | zip_validation.png                                                                          |

---

### **TC_CHECKOUT_006: Order Confirmation Email - Integration**

| Attribute           | Value                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **Priority**        | High                                                                                        |
| **Type**            | Integration                                                                                 |
| **Precondition**    | Order successfully placed                                                                   |
| **Steps**           | 1. Complete order 2. Check email inbox for confirmation email 3. Verify details match order |
| **Expected Result** | ✅ Confirmation email received within 5 minutes with order details                          |
| **Test Data**       | Test email account                                                                          |
| **Screenshots**     | confirmation_email.png                                                                      |

---

## ❤️ FEATURE 7: WISHLIST MANAGEMENT (4 Tests)

### **TC_WISHLIST_001: Add to Wishlist - Happy Path**

| Attribute           | Value                                                          |
| ------------------- | -------------------------------------------------------------- |
| **Priority**        | Medium                                                         |
| **Type**            | Positive                                                       |
| **Precondition**    | User is logged in, on product page                             |
| **Steps**           | 1. Click "Add to Wishlist" button 2. Verify success            |
| **Expected Result** | ✅ Product added, notification shown, wishlist count increased |
| **Test Data**       | Product ID                                                     |
| **Screenshots**     | added_to_wishlist.png                                          |

---

### **TC_WISHLIST_002: Remove from Wishlist - Happy Path**

| Attribute           | Value                                                           |
| ------------------- | --------------------------------------------------------------- |
| **Priority**        | Medium                                                          |
| **Type**            | Positive                                                        |
| **Precondition**    | Product is in wishlist                                          |
| **Steps**           | 1. Go to Wishlist page 2. Click "Remove" for product 3. Confirm |
| **Expected Result** | ✅ Product removed, wishlist updated                            |
| **Test Data**       | Wishlist item                                                   |
| **Screenshots**     | removed_from_wishlist.png                                       |

---

### **TC_WISHLIST_003: Wishlist Persistence - State**

| Attribute           | Value                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| **Priority**        | High                                                                  |
| **Type**            | State Management                                                      |
| **Precondition**    | Products are in wishlist                                              |
| **Steps**           | 1. Add product to wishlist 2. Logout 3. Login again 4. Check wishlist |
| **Expected Result** | ✅ Wishlist items persist after logout/login                          |
| **Test Data**       | Wishlist persistence                                                  |
| **Screenshots**     | wishlist_persisted.png                                                |

---

### **TC_WISHLIST_004: Share Wishlist - Feature**

| Attribute           | Value                                                                         |
| ------------------- | ----------------------------------------------------------------------------- |
| **Priority**        | Low                                                                           |
| **Type**            | Feature                                                                       |
| **Precondition**    | Wishlist has items                                                            |
| **Steps**           | 1. Click "Share Wishlist" 2. Copy link 3. Send to friend 4. Friend opens link |
| **Expected Result** | ✅ Friend can view wishlist (read-only), see all items and prices             |
| **Test Data**       | Share link                                                                    |
| **Screenshots**     | wishlist_shared.png, shared_view.png                                          |

---

## 🌍 FEATURE 8: CURRENCY & LANGUAGE CHANGE (4 Tests)

### **TC_CURRENCY_001: Change Currency - Happy Path**

| Attribute           | Value                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Priority**        | High                                                                                       |
| **Type**            | Positive                                                                                   |
| **Precondition**    | User is on homepage (USD selected by default)                                              |
| **Steps**           | 1. Click currency dropdown 2. Select "EUR" 3. Verify prices updated 4. Navigate to product |
| **Expected Result** | ✅ All prices converted to EUR, € symbol shown, conversion rates correct                   |
| **Test Data**       | Currency: EUR, GBP, JPY                                                                    |
| **Screenshots**     | eur_prices.png                                                                             |

---

### **TC_CURRENCY_002: Currency Persistence - State**

| Attribute           | Value                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                        |
| **Type**            | State                                                                                         |
| **Precondition**    | User selected EUR                                                                             |
| **Steps**           | 1. Change currency to EUR 2. Navigate to different page 3. Add to cart 4. Check cart currency |
| **Expected Result** | ✅ EUR currency persists across site, no reversion to USD                                     |
| **Test Data**       | Currency selection                                                                            |
| **Screenshots**     | currency_persisted.png                                                                        |

---

### **TC_LANGUAGE_001: Change Language - Happy Path**

| Attribute           | Value                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                                  |
| **Type**            | Positive                                                                                |
| **Precondition**    | User is on English version                                                              |
| **Steps**           | 1. Click language dropdown 2. Select "Español" (Spanish) 3. Verify text changed         |
| **Expected Result** | ✅ Entire site switched to Spanish, all labels translated, layout adjusted for language |
| **Test Data**       | Languages: English, Español, Deutsch, Français                                          |
| **Screenshots**     | spanish_site.png                                                                        |

---

### **TC_LOCALIZATION_001: Locale-Specific Features - Integration**

| Attribute           | Value                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| **Priority**        | Medium                                                                            |
| **Type**            | Localization                                                                      |
| **Precondition**    | User selects German language and EUR currency                                     |
| **Steps**           | 1. Select Deutsch 2. Select EUR 3. Check date format, number format               |
| **Expected Result** | ✅ Date format = DD.MM.YYYY (German), numbers use "," for decimals (1.500,50 EUR) |
| **Test Data**       | Locale combination: German + EUR                                                  |
| **Screenshots**     | german_locale.png, number_format.png                                              |

---

## 📊 TEST CASE SUMMARY

| Feature           | Happy Path | Fail Case | Edge Case | Total  |
| ----------------- | ---------- | --------- | --------- | ------ |
| Registration      | 1          | 2         | 3         | **6**  |
| Login             | 1          | 3         | 3         | **7**  |
| Search            | 1          | 1         | 6         | **8**  |
| Product           | 2          | 1         | 3         | **6**  |
| Cart              | 3          | 1         | 2         | **6**  |
| Checkout          | 1          | 2         | 3         | **6**  |
| Wishlist          | 2          | 0         | 2         | **4**  |
| Currency/Language | 2          | 0         | 2         | **4**  |
| **TOTAL**         | **13**     | **10**    | **24**    | **47** |

---

## ✅ DELIVERABLES CHECKLIST

- ✅ 47 test cases defined (exceeds 24 minimum)
- ✅ Happy Path scenarios included
- ✅ Fail/Negative cases included
- ✅ Edge cases included
- ✅ Security tests included
- ✅ State management tests included
- ✅ Integration tests included
- ✅ All preconditions specified
- ✅ All steps detailed
- ✅ All expected results defined
- ✅ Test data provided
- ✅ Screenshot checkpoints defined

---
