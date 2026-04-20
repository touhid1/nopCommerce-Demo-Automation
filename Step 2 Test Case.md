# Step 2: Test Case Definition
**NopCommerce Automation Assignment**  
**8 Features × 3 Scenario Types = 24+ Test Cases**

---

## Feature 1: User Registration

### Test Case 1.1: Registration - Happy Path (Valid Input)
| Field | Value |
|-------|-------|
| **Test ID** | TC_REG_001 |
| **Priority** | Critical |
| **Preconditions** | 1. Browser opened, navigated to https://demo.nopcommerce.com/<br>2. User not already logged in<br>3. Test account email not previously registered |
| **Test Steps** | 1. Click "Register" link in header<br>2. Fill "Your Personal Details": First Name = "John", Last Name = "Doe"<br>3. Fill "Your Address Details": Company = "TechCorp", Street = "123 Main St", City = "NewYork", State = "NY", ZipCode = "10001", Country = "United States"<br>4. Fill "Your Password": Email = "john.doe.automation@test.com", Password = "SecurePass123!", Confirm Password = "SecurePass123!"<br>5. Click "Newsletter" checkbox<br>6. Click "REGISTER" button<br>7. Verify redirect to customer dashboard |
| **Expected Result** | ✅ SUCCESS: Registration completes, user is logged in, dashboard displays "Welcome back, John Doe", customer account created in DB, confirmation email sent, session cookie set |
| **Test Data** | Email: john.doe.automation+{timestamp}@test.com (randomized to avoid duplicates)<br>Password: SecurePass123! |
| **Screenshots/Logs** | Capture: registration form, success page, customer dashboard |

---

### Test Case 1.2: Registration - Fail Case (Invalid Email Format)
| Field | Value |
|-------|-------|
| **Test ID** | TC_REG_002 |
| **Priority** | High |
| **Preconditions** | 1. Browser opened at registration page<br>2. Form is blank/fresh |
| **Test Steps** | 1. Fill "Your Personal Details": First Name = "Jane", Last Name = "Smith"<br>2. Fill "Your Address Details": Company = "Corp", Street = "456 Oak", City = "Boston", State = "MA", ZipCode = "02101", Country = "United States"<br>3. Fill "Your Password": Email = "invalid.email.format", Password = "Test123!", Confirm = "Test123!"<br>4. Click "REGISTER" button<br>5. Observe error message |
| **Expected Result** | ❌ FAIL: Registration blocked, error message displayed: "Invalid email address format" or similar, user remains on registration page, NO account created |
| **Test Data** | Invalid Emails: "notanemail", "test@", "@domain.com", "test@domain", "test..email@domain.com" |
| **Screenshots/Logs** | Capture: error message, form state (data should persist) |

---

### Test Case 1.3: Registration - Edge Case (Password Validation - Too Weak)
| Field | Value |
|-------|-------|
| **Test ID** | TC_REG_003 |
| **Priority** | High |
| **Preconditions** | 1. Browser at registration page<br>2. All required fields ready to fill |
| **Test Steps** | 1. Fill all personal & address details correctly<br>2. Email = "test.weak.pass@automation.com"<br>3. Password = "123" (too short, no special chars)<br>4. Confirm Password = "123"<br>5. Click "REGISTER"<br>6. Observe validation response |
| **Expected Result** | ❌ FAIL: Registration blocked, error message: "Password must be at least 6 characters and contain uppercase, lowercase, numbers, and special characters", password field highlighted, registration form persists |
| **Test Data** | Weak Passwords: "123", "password", "Test123", "abc123!" (check NopCommerce policy) |
| **Screenshots/Logs** | Capture: password strength indicator, error message, form highlighting |

---

### Test Case 1.4: Registration - Edge Case (Duplicate Email)
| Field | Value |
|-------|-------|
| **Test ID** | TC_REG_004 |
| **Priority** | High |
| **Preconditions** | 1. Account already exists: "existing.customer@test.com"<br>2. Browser at registration page<br>3. Not logged in |
| **Test Steps** | 1. Fill all personal & address fields correctly<br>2. Email = "existing.customer@test.com" (already registered)<br>3. Password = "NewPass123!"<br>4. Click "REGISTER"<br>5. Observe error response |
| **Expected Result** | ❌ FAIL: Registration blocked, error: "This email address is already associated with an account", form persists, NO duplicate account created |
| **Test Data** | Pre-registered Email: existing.customer@test.com (seed in test DB) |
| **Screenshots/Logs** | Capture: error message, DB verification that no duplicate created |

---

## Feature 2: User Login

### Test Case 2.1: Login - Happy Path (Valid Credentials)
| Field | Value |
|-------|-------|
| **Test ID** | TC_LOGIN_001 |
| **Priority** | Critical |
| **Preconditions** | 1. Browser at https://demo.nopcommerce.com/<br>2. User account exists: Email = "testuser@automation.com", Password = "AutoPass123!"<br>3. Account status = Active<br>4. User is logged out |
| **Test Steps** | 1. Click "LOGIN" in header<br>2. Enter Email = "testuser@automation.com"<br>3. Enter Password = "AutoPass123!"<br>4. Check "Remember me?" checkbox<br>5. Click "LOG IN" button<br>6. Verify dashboard appears |
| **Expected Result** | ✅ SUCCESS: Redirect to customer dashboard, "Welcome back testuser@automation.com" displayed, session cookie set, "Remember me" cookie persists for 30 days, no visible errors |
| **Test Data** | Email: testuser@automation.com<br>Password: AutoPass123! |
| **Screenshots/Logs** | Capture: login page, dashboard, browser cookies |

---

### Test Case 2.2: Login - Fail Case (Wrong Password)
| Field | Value |
|-------|-------|
| **Test ID** | TC_LOGIN_002 |
| **Priority** | Critical |
| **Preconditions** | 1. Account exists: "testuser@automation.com"<br>2. User logged out<br>3. Account not locked |
| **Test Steps** | 1. Navigate to login page<br>2. Email = "testuser@automation.com"<br>3. Password = "WrongPassword123!"<br>4. Click "LOG IN"<br>5. Observe error & form state |
| **Expected Result** | ❌ FAIL: Login denied, error message: "Login unsuccessful. Please correct the errors and try again. The credentials provided are incorrect", user remains on login page, password field is cleared for security, email field retains value |
| **Test Data** | Valid Email: testuser@automation.com<br>Wrong Password: WrongPassword123! (incorrect) |
| **Screenshots/Logs** | Capture: error message, login form state, verify NO session created |

---

### Test Case 2.3: Login - Edge Case (Account Lockout After Failed Attempts)
| Field | Value |
|-------|-------|
| **Test ID** | TC_LOGIN_003 |
| **Priority** | High |
| **Preconditions** | 1. Account exists & active<br>2. No prior lockout<br>3. System has max login attempts setting (typically 5) |
| **Test Steps** | 1. Attempt login with correct email, wrong password 5 times (rapid fire)<br>2. On 6th attempt, try with correct password<br>3. Observe response |
| **Expected Result** | ❌ FAIL: After 5 failed attempts, account locked, error: "Account is locked out due to multiple failed login attempts. Please contact support or wait 30 minutes", 6th attempt also blocked even with correct password, email sent to user about lockout |
| **Test Data** | Test Account: locked.test@automation.com<br>Correct Password: CorrectPass123!<br>Wrong Password: WrongPass123! |
| **Screenshots/Logs** | Capture: each failed attempt, lockout message, verify account status in DB |

---

### Test Case 2.4: Login - Edge Case (SQL Injection Attempt)
| Field | Value |
|-------|-------|
| **Test ID** | TC_LOGIN_004 |
| **Priority** | Critical (Security) |
| **Preconditions** | 1. Secure login implementation expected<br>2. Browser at login page |
| **Test Steps** | 1. Email field: enter "admin'--" (SQL injection attempt)<br>2. Password field: enter "' OR '1'='1" (SQL injection payload)<br>3. Click "LOG IN"<br>4. Verify response |
| **Expected Result** | ✅ SUCCESS (security validation): Login fails, error: "Invalid credentials", NO database error visible, NO unauthorized access, payload is escaped/sanitized, security log records attempt |
| **Test Data** | SQL Injection Attempts: "admin'--", "' OR '1'='1", "admin' UNION SELECT...", "test@test.com' DROP TABLE users--" |
| **Screenshots/Logs** | Capture: error message, browser console (no SQL errors), security logs verify attempt was logged |

---

## Feature 3: Search & Filtering

### Test Case 3.1: Search - Happy Path (Valid Product Search)
| Field | Value |
|-------|-------|
| **Test ID** | TC_SEARCH_001 |
| **Priority** | Critical |
| **Preconditions** | 1. Catalog contains products: "Laptop", "USB Cable", "Wireless Mouse"<br>2. User on homepage or any category page<br>3. Search index is up-to-date |
| **Test Steps** | 1. Click search box in header<br>2. Type "Laptop"<br>3. Press Enter or click search icon<br>4. Observe search results page<br>5. Verify results list, pagination, relevance |
| **Expected Result** | ✅ SUCCESS: Search results page displays with relevant products (Laptop should be in results), product count shown ("Showing 1-12 of 45 products"), products sorted by relevance/popularity, "Laptop" highlighted in product names, "View as: Grid/List" options available, pagination working |
| **Test Data** | Search Query: "Laptop"<br>Expected Results: 45+ products with "Laptop" in name/description |
| **Screenshots/Logs** | Capture: search results page, product count, sorting options |

---

### Test Case 3.2: Search - Fail Case (No Results Found)
| Field | Value |
|-------|-------|
| **Test ID** | TC_SEARCH_002 |
| **Priority** | High |
| **Preconditions** | 1. Search box functional<br>2. Query returns zero results |
| **Test Steps** | 1. Click search box<br>2. Type "XYZABC123NonExistent"<br>3. Press Enter<br>4. Observe results page |
| **Expected Result** | ❌ FAIL (expected behavior): "No products found" or "Your search query did not yield any results" message displayed, suggestion to try different keywords, "View all products" link offered, no 500 error visible |
| **Test Data** | Search Query: "XYZABC123NonExistent" (guaranteed no match) |
| **Screenshots/Logs** | Capture: empty results message, suggestions |

---

### Test Case 3.3: Search - Edge Case (Special Characters in Search)
| Field | Value |
|-------|-------|
| **Test ID** | TC_SEARCH_003 |
| **Priority** | Medium |
| **Preconditions** | 1. Products with special characters exist: "USB-C Cable", "Windows(R) 10"<br>2. Search functional |
| **Test Steps** | 1. Search: "USB-C"<br>2. Verify results include "USB-C Cable"<br>3. Search: "Windows(R)"<br>4. Observe handling of special characters<br>5. Search: "<script>alert('xss')</script>"<br>6. Verify no script execution |
| **Expected Result** | ✅ SUCCESS: Special characters handled correctly, "USB-C Cable" appears in results, "Windows(R)" query works, malicious script attempt shows no error but returns no results (sanitized), no XSS vulnerability |
| **Test Data** | Search Queries: "USB-C", "Windows(R)", "<script>", "'; DROP TABLE--" |
| **Screenshots/Logs** | Capture: special character results, browser console (no errors/XSS), security verification |

---

### Test Case 3.4: Search with Filters - Happy Path (Price Range Filter)
| Field | Value |
|-------|-------|
| **Test ID** | TC_SEARCH_004 |
| **Priority** | High |
| **Preconditions** | 1. Catalog has products in price ranges: $10-100, $100-500, $500+<br>2. Filters visible on search results page |
| **Test Steps** | 1. Search for "Laptop"<br>2. On results page, find "Price" filter<br>3. Set price range: Min = "$100", Max = "$500"<br>4. Click "Filter" or filter auto-applies<br>5. Verify filtered results |
| **Expected Result** | ✅ SUCCESS: Results show only products $100-500, count updates ("Showing 1-8 of 12 products with price $100-$500"), filter tag displays active, "Clear filters" button available, all products shown meet criteria |
| **Test Data** | Product Catalog: Mix of laptops at $150, $300, $599<br>Filter: $100-$500 |
| **Screenshots/Logs** | Capture: filter applied, results updated, filter tag visible |

---

### Test Case 3.5: Search - Edge Case (Pagination Edge Cases)
| Field | Value |
|-------|-------|
| **Test ID** | TC_SEARCH_005 |
| **Priority** | Medium |
| **Preconditions** | 1. Search returns 100+ results<br>2. Page size = 12 per page |
| **Test Steps** | 1. Search "Laptop" (100+ results)<br>2. Verify Page 1 displays products 1-12<br>3. Click "Next" to go to Page 2<br>4. Verify Page 2 displays 13-24<br>5. Click last page arrow (if exists)<br>6. Verify last page shows remaining products<br>7. Try clicking "Next" on last page (edge case)<br>8. Verify no error, button disabled or page stays same |
| **Expected Result** | ✅ SUCCESS: Pagination works correctly, products don't duplicate across pages, last page shows remaining items correctly (not always 12), "Next" button disabled on last page, jumping to page 5 directly works, browser back/forward maintains pagination state |
| **Test Data** | 100+ products per search |
| **Screenshots/Logs** | Capture: each page transition, last page behavior |

---

## Feature 4: Add to Cart

### Test Case 4.1: Add to Cart - Happy Path (Single Item)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CART_001 |
| **Priority** | Critical |
| **Preconditions** | 1. User not logged in (guest user)<br>2. Product "Wireless Mouse" (SKU: WM-001, Price: $25.99) exists, in stock, qty = 100<br>3. Cart is empty<br>4. User on product detail page |
| **Test Steps** | 1. View product "Wireless Mouse"<br>2. Set quantity = "1"<br>3. Click "ADD TO CART" button<br>4. Verify toast/popup: "The product has been added to your shopping cart"<br>5. Verify cart count increases (header shows "1 item")<br>6. Click "Shopping Cart" to view cart contents |
| **Expected Result** | ✅ SUCCESS: Product added to cart, toast notification shown, cart icon updates (1 item), cart page shows "Wireless Mouse", Qty = 1, Unit Price = $25.99, Total = $25.99, "Continue Shopping" and "Checkout" buttons visible, no price calculation errors |
| **Test Data** | Product: Wireless Mouse, SKU: WM-001, Price: $25.99, Available Stock: 100 |
| **Screenshots/Logs** | Capture: product page, add to cart button click, toast notification, cart page |

---

### Test Case 4.2: Add to Cart - Fail Case (Out of Stock)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CART_002 |
| **Priority** | Critical |
| **Preconditions** | 1. Product "Retro USB Fan" (SKU: RUF-001) marked as Out of Stock<br>2. Stock qty = 0<br>3. User on product detail page |
| **Test Steps** | 1. View product "Retro USB Fan"<br>2. Observe product page<br>3. Attempt to increase quantity or click "ADD TO CART"<br>4. Observe system response |
| **Expected Result** | ❌ FAIL (expected): "Out of Stock" label/ribbon displayed on product, "ADD TO CART" button disabled (grayed out) OR button shows "Out of Stock", error message if user clicks button: "This product is out of stock. Please try again later or choose another product", NO item added to cart |
| **Test Data** | Out of Stock Product: Retro USB Fan, SKU: RUF-001, Current Stock: 0 |
| **Screenshots/Logs** | Capture: product page with out of stock status, disabled button, error message |

---

### Test Case 4.3: Add to Cart - Edge Case (Quantity Limit Exceeded)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CART_003 |
| **Priority** | High |
| **Preconditions** | 1. Product "USB Hub" has max purchase qty = 5<br>2. User attempting to add qty > 5 |
| **Test Steps** | 1. View "USB Hub" product<br>2. Set quantity input field to "10" (exceeds limit)<br>3. Click "ADD TO CART"<br>4. Observe validation response |
| **Expected Result** | ❌ FAIL: Error message: "You can purchase a maximum of 5 units of this product", quantity field resets or shows "5", item NOT added to cart at all, validation tooltip/highlight on qty field |
| **Test Data** | Product: USB Hub, Max Purchase Qty: 5, Test Qty: 10 |
| **Screenshots/Logs** | Capture: quantity validation error, qty field state |

---

### Test Case 4.4: Add to Cart - Edge Case (Same Item Added Twice)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CART_004 |
| **Priority** | Medium |
| **Preconditions** | 1. Cart is empty<br>2. Product "Keyboard Mechanical" (Price: $79.99) in stock<br>3. User on product page |
| **Test Steps** | 1. Add "Keyboard Mechanical" qty = 1 to cart<br>2. Continue shopping<br>3. Navigate back to "Keyboard Mechanical" product page<br>4. Add another qty = 2 (same product)<br>5. View shopping cart<br>6. Observe quantity handling |
| **Expected Result** | ✅ SUCCESS (two behaviors acceptable):<br>OPTION A: Cart shows single line item "Keyboard Mechanical" with qty = 3, total = $239.97<br>OPTION B: Cart shows two separate line items (both "Keyboard Mechanical"), allowing separate removal<br>Most systems use OPTION A: quantities are merged for same SKU |
| **Test Data** | Product: Keyboard Mechanical, Price: $79.99 |
| **Screenshots/Logs** | Capture: product added once, product added again, cart showing merged qty |

---

### Test Case 4.5: Add to Cart - Edge Case (Price Validation After Discount)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CART_005 |
| **Priority** | High |
| **Preconditions** | 1. Promotion active: "Keyboards on sale 20% off"<br>2. Product "Keyboard Mechanical" original price = $79.99, sale price = $63.99 (20% off)<br>3. User on product detail page |
| **Test Steps** | 1. View "Keyboard Mechanical" product<br>2. Verify price shown = "$63.99" (discounted)<br>3. Verify original price = "$79.99" (struck through)<br>4. Add qty = 1 to cart<br>5. View cart and verify unit price |
| **Expected Result** | ✅ SUCCESS: Product shows discounted price on detail page, cart displays unit price = $63.99 (NOT $79.99), total = $63.99, discount tag shown ("20% OFF" or "Save $16.00"), price recalculation is accurate |
| **Test Data** | Product: Keyboard Mechanical<br>Original: $79.99<br>Sale: $63.99 (20% discount)<br>Active Promo: Keyboard Sale |
| **Screenshots/Logs** | Capture: product detail with discount, cart with correct price |

---

## Feature 5: Checkout Process

### Test Case 5.1: Checkout - Happy Path (Complete Order)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CHECKOUT_001 |
| **Priority** | Critical |
| **Preconditions** | 1. User logged in: testuser@automation.com<br>2. Cart contains: Wireless Mouse ($25.99) qty = 1<br>3. User has saved address on file<br>4. Shipping method = Standard (5-7 days, $5.99)<br>5. Payment method enabled: Credit Card |
| **Test Steps** | 1. Click "Checkout" from cart page<br>2. STEP 1 - Billing Address: Select saved address "123 Main St, New York"<br>3. STEP 2 - Shipping Address: Same as billing (checkbox checked)<br>4. STEP 3 - Shipping Method: Select "Standard Shipping - $5.99"<br>5. STEP 4 - Payment Method: Select "Credit Card", enter test card: 4111111111111111, Exp: 12/25, CVV: 123<br>6. Review order summary: Subtotal $25.99 + Shipping $5.99 = Total $31.98<br>7. Click "CONFIRM ORDER"<br>8. Verify order success page |
| **Expected Result** | ✅ SUCCESS: Order created successfully, Order Number generated (e.g., "#123456"), order confirmation page displays, customer receives confirmation email, order visible in My Orders/Account, payment processed correctly (no double charge), inventory decremented (stock now = 99) |
| **Test Data** | Card: 4111111111111111 (Visa test card)<br>Exp: 12/25<br>CVV: 123<br>Address: 123 Main St, New York, NY 10001 |
| **Screenshots/Logs** | Capture: each checkout step, order confirmation page, order number |

---

### Test Case 5.2: Checkout - Fail Case (Declined Payment)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CHECKOUT_002 |
| **Priority** | Critical |
| **Preconditions** | 1. User at payment method step<br>2. Cart total: $31.98<br>3. Test card available: 4000000000000002 (declines) |
| **Test Steps** | 1. Fill shipping details (same as TC_CHECKOUT_001)<br>2. At Payment Method step, enter card: 4000000000000002<br>3. Exp: 12/25, CVV: 123<br>4. Click "CONFIRM ORDER"<br>5. Observe payment response |
| **Expected Result** | ❌ FAIL: Payment declined, error: "Payment declined. Please use a different card or contact your bank", user remains at payment page, cart/items NOT removed, NO order created, user can retry with different card, no money charged to declined card |
| **Test Data** | Test Card (Decline): 4000000000000002<br>Cart Total: $31.98 |
| **Screenshots/Logs** | Capture: payment error message, checkout state preserved, verify NO order in DB |

---

### Test Case 5.3: Checkout - Edge Case (Missing Required Address Field)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CHECKOUT_003 |
| **Priority** | High |
| **Preconditions** | 1. User at Billing Address step<br>2. No saved addresses on file<br>3. Must enter manual address |
| **Test Steps** | 1. Select "Enter a new address"<br>2. Fill: First Name = "John", Last Name = "Doe"<br>3. Fill: Street = "456 Oak Ave"<br>4. Fill: City = "Boston"<br>5. Leave "State/Province" EMPTY (required field)<br>6. Fill: ZipCode = "02101", Country = "United States"<br>7. Click "Continue" to next step<br>8. Observe validation |
| **Expected Result** | ❌ FAIL: Form validation error: "State is required", State field highlighted in red, error message/tooltip, user cannot proceed, form persists with other data intact |
| **Test Data** | Address: Incomplete (missing State)<br>Street: 456 Oak Ave<br>City: Boston<br>ZipCode: 02101<br>Country: United States |
| **Screenshots/Logs** | Capture: validation error, highlighted field, form state |

---

### Test Case 5.4: Checkout - Edge Case (Shipping Method Unavailable for Address)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CHECKOUT_004 |
| **Priority** | High |
| **Preconditions** | 1. User at Shipping Method step<br>2. Address selected: Remote location (e.g., Alaska, rural area)<br>3. System restricts certain shipping methods for certain regions |
| **Test Steps** | 1. Select shipping address: "Fairbanks, Alaska 99701"<br>2. Proceed to Shipping Method selection<br>3. Observe available methods |
| **Expected Result** | ✅ SUCCESS: System correctly restricts/adjusts shipping methods, may show: "Express Overnight unavailable for this address. Available methods: Standard (10-15 days), Ground (6-8 days)", OR "Additional fees apply for remote locations: +$15", user can select available method or choose alternate address |
| **Test Data** | Remote Address: Fairbanks, Alaska 99701 |
| **Screenshots/Logs** | Capture: shipping method options for remote area, available/unavailable methods |

---

## Feature 6: Wishlist Management

### Test Case 6.1: Wishlist - Happy Path (Add to Wishlist)
| Field | Value |
|-------|-------|
| **Test ID** | TC_WISHLIST_001 |
| **Priority** | Medium |
| **Preconditions** | 1. User logged in: testuser@automation.com<br>2. Wishlist is empty<br>3. User on product detail page: "Laptop Dell XPS 13" |
| **Test Steps** | 1. Click "Add to Wishlist" button (heart icon or link)<br>2. Verify toast notification: "Successfully added to wishlist"<br>3. Navigate to My Account → Wishlist<br>4. Observe wishlist page |
| **Expected Result** | ✅ SUCCESS: Product added to wishlist, heart icon appears filled/highlighted, wishlist page displays "Dell XPS 13", product shows price, "Remove from Wishlist" option visible, "Add to Cart from Wishlist" button available, wishlist count updates in navigation |
| **Test Data** | Product: Laptop Dell XPS 13, Price: $999.99 |
| **Screenshots/Logs** | Capture: heart icon change, toast notification, wishlist page |

---

### Test Case 6.2: Wishlist - Fail Case (Remove from Wishlist)
| Field | Value |
|-------|-------|
| **Test ID** | TC_WISHLIST_002 |
| **Priority** | Medium |
| **Preconditions** | 1. User logged in<br>2. "Dell XPS 13" already in wishlist<br>3. User on wishlist page |
| **Test Steps** | 1. Click "Remove" or "X" button on wishlist item<br>2. Confirm removal (if popup appears)<br>3. Observe wishlist update |
| **Expected Result** | ✅ SUCCESS: Item removed from wishlist, page refreshes/item disappears, "Wishlist is now empty" message if no items remain, product no longer shows in wishlist, heart icon on product page is unfilled again |
| **Test Data** | Product: Laptop Dell XPS 13 (to be removed) |
| **Screenshots/Logs** | Capture: removal action, empty wishlist state |

---

### Test Case 6.3: Wishlist - Edge Case (Wishlist Persistence After Logout)
| Field | Value |
|-------|-------|
| **Test ID** | TC_WISHLIST_003 |
| **Priority** | Medium |
| **Preconditions** | 1. User logged in<br>2. Wishlist contains: "Dell XPS 13", "Mechanical Keyboard"<br>3. User about to logout |
| **Test Steps** | 1. View wishlist (2 items present)<br>2. Logout<br>3. Login again with same credentials<br>4. Navigate to My Account → Wishlist<br>5. Verify wishlist contents |
| **Expected Result** | ✅ SUCCESS: Wishlist persists after logout/login, both items still present, wishlist is tied to user account (NOT browser/cookies), data integrity confirmed |
| **Test Data** | Wishlist Items: Laptop Dell XPS 13, Mechanical Keyboard |
| **Screenshots/Logs** | Capture: wishlist before logout, after login |

---

### Test Case 6.4: Wishlist - Edge Case (Share Wishlist Link)
| Field | Value |
|-------|-------|
| **Test ID** | TC_WISHLIST_004 |
| **Priority** | Low-Medium |
| **Preconditions** | 1. User has wishlist with items<br>2. Share feature available |
| **Test Steps** | 1. On wishlist page, click "Share Wishlist" button<br>2. Copy generated link or email option<br>3. Open link in new incognito/private window (not logged in)<br>4. Verify shared wishlist visibility |
| **Expected Result** | ✅ SUCCESS: Shared link is public-readable, other users see wishlist items (product names, prices, images) BUT cannot modify, cannot see email/personal details, can add items from shared wishlist to their own cart |
| **Test Data** | Wishlist: 3-5 items<br>Share Link: https://demo.nopcommerce.com/wishlist/share/abc123def |
| **Screenshots/Logs** | Capture: share button, public wishlist view, verify no personal data exposed |

---

## Feature 7: Product Comparison

### Test Case 7.1: Product Comparison - Happy Path (Compare 2 Products)
| Field | Value |
|-------|-------|
| **Test ID** | TC_COMPARE_001 |
| **Priority** | Medium |
| **Preconditions** | 1. User on product listing/search results<br>2. Products available: "Laptop Dell XPS 13" and "Laptop HP Pavilion"<br>3. Comparison table not yet populated |
| **Test Steps** | 1. On first product "Dell XPS 13", click "Add to Compare" button<br>2. Verify toast: "Successfully added to comparison"<br>3. On second product "HP Pavilion", click "Add to Compare"<br>4. Click "Compare Products" link/button<br>5. View comparison page |
| **Expected Result** | ✅ SUCCESS: Comparison table displays with both products, columns: Model, Price, Processor, RAM, Storage, Screen Size, Weight, etc., side-by-side comparison clear and aligned, "Add to Cart" button for each product, "Remove from Comparison" option per product |
| **Test Data** | Products: Laptop Dell XPS 13 ($999.99), Laptop HP Pavilion ($749.99) |
| **Screenshots/Logs** | Capture: add to compare action, comparison table, alignment of specs |

---

### Test Case 7.2: Product Comparison - Edge Case (Compare Out of Stock)
| Field | Value |
|-------|-------|
| **Test ID** | TC_COMPARE_002 |
| **Priority** | Medium |
| **Preconditions** | 1. One product in stock, one out of stock<br>2. Both eligible for comparison |
| **Test Steps** | 1. Add "Dell XPS 13" (In Stock) to comparison<br>2. Add "HP Pavilion" (Out of Stock) to comparison<br>3. View comparison table<br>4. Verify display handling |
| **Expected Result** | ✅ SUCCESS: Comparison shows both products, out-of-stock product clearly marked ("Out of Stock" label or grayed out), "Add to Cart" button disabled for out-of-stock item, OR button shows "Out of Stock", other specs still visible for comparison |
| **Test Data** | In Stock: Dell XPS 13<br>Out of Stock: HP Pavilion |
| **Screenshots/Logs** | Capture: comparison with out of stock status visible |

---

### Test Case 7.3: Product Comparison - Edge Case (Max Comparison Limit)
| Field | Value |
|-------|-------|
| **Test ID** | TC_COMPARE_003 |
| **Priority** | Low-Medium |
| **Preconditions** | 1. System allows max 4 products in comparison<br>2. User has 4 products already selected |
| **Test Steps** | 1. Add 4 products to comparison: Dell XPS, HP Pavilion, Lenovo ThinkPad, ASUS VivoBook<br>2. Try to add 5th product "Apple MacBook"<br>3. Observe system response |
| **Expected Result** | ✅ SUCCESS: Either: "Add to Compare" button is disabled/hidden after 4 items, OR error message: "Maximum 4 products can be compared. Please remove one before adding another", OR system automatically removes oldest item and adds new one (with confirmation) |
| **Test Data** | 4 Laptop Products already selected, attempting to add 5th |
| **Screenshots/Logs** | Capture: limit enforcement, button state, error/info message |

---

## Feature 8: Currency & Language Change

### Test Case 8.1: Currency Change - Happy Path (USD to EUR)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CURRENCY_001 |
| **Priority** | Medium |
| **Preconditions** | 1. User on homepage<br>2. Default currency = USD<br>3. Product price displayed = "$25.99"<br>4. Currency selector in header/footer |
| **Test Steps** | 1. Click currency dropdown (header or footer)<br>2. Select "EUR - Euro"<br>3. Verify page reload/update<br>4. Check product prices<br>5. Navigate to another page (e.g., product detail)<br>6. Verify currency persists |
| **Expected Result** | ✅ SUCCESS: Currency changes to EUR, prices recalculate using current exchange rate (e.g., $25.99 ≈ €23.50), currency symbol changes (€), product pages show EUR, cart displays EUR prices, checkout shows EUR total, currency preference persists via cookie/session after reload, logout, re-login |
| **Test Data** | Products: Wireless Mouse $25.99 ≈ €23.50 (using standard XE rates) |
| **Screenshots/Logs** | Capture: currency selector, price change, product page in EUR, persistence after reload |

---

### Test Case 8.2: Currency Change - Edge Case (Price Rounding)
| Field | Value |
|-------|-------|
| **Test ID** | TC_CURRENCY_002 |
| **Priority** | High |
| **Preconditions** | 1. USD cart total = $107.53 (odd decimal)<br>2. Converting to GBP (British Pound)<br>3. Exchange rate: 1 USD = 0.79 GBP<br>4. Result should be £84.95 (with proper rounding) |
| **Test Steps** | 1. Add products to cart totaling $107.53<br>2. Change currency to GBP<br>3. View cart and observe total<br>4. Proceed to checkout<br>5. Verify final charged amount in GBP |
| **Expected Result** | ✅ SUCCESS: Price correctly converted and rounded (to 2 decimal places), Total = £84.95 (NOT £84.9447 or truncated), checkout processes with correct rounded amount, no rounding discrepancies |
| **Test Data** | USD Total: $107.53<br>Exchange Rate: 1 USD = 0.79 GBP<br>Expected GBP: £84.95 |
| **Screenshots/Logs** | Capture: price conversion, rounding display, cart/checkout totals |

---

### Test Case 8.3: Language Change - Happy Path (English to Spanish)
| Field | Value |
|-------|-------|
| **Test ID** | TC_LANGUAGE_001 |
| **Priority** | Medium |
| **Preconditions** | 1. User on homepage<br>2. Current language = English<br>3. Language selector available (header, footer)<br>4. Spanish translation complete (assumed) |
| **Test Steps** | 1. Click language dropdown<br>2. Select "Español" (Spanish)<br>3. Verify page reloads in Spanish<br>4. Check key elements:<br>   - Navigation menu in Spanish<br>   - Button labels in Spanish ("AÑADIR AL CARRITO" instead of "ADD TO CART")<br>   - Prices and currency still correct<br>5. Navigate to product detail, cart, checkout<br>6. All text in Spanish<br>7. Change back to English |
| **Expected Result** | ✅ SUCCESS: Entire site switches to Spanish, all user-facing text translated (menus, buttons, labels, error messages), navigation works correctly, links/functionality unchanged, currency and prices unaffected (only language changes), language preference persists across pages and sessions (via cookie) |
| **Test Data** | Languages: English → Spanish<br>Key Terms: "Add to Cart" → "Añadir al carrito", "Search" → "Buscar" |
| **Screenshots/Logs** | Capture: language selector, site in Spanish, key translated elements |

---

### Test Case 8.4: Localization - Edge Case (Mixed Currency & Language)
| Field | Value |
|-------|-------|
| **Test ID** | TC_LOCALIZATION_001 |
| **Priority** | Low-Medium |
| **Preconditions** | 1. User changes currency to EUR<br>2. User changes language to French<br>3. User is logged in<br>4. Cart contains items |
| **Test Steps** | 1. Set Currency = EUR (Euro)<br>2. Set Language = Français<br>3. Add product to cart (price shows in EUR, labels in French)<br>4. Logout and login again<br>5. Navigate to My Account<br>6. Verify both settings persist |
| **Expected Result** | ✅ SUCCESS: Both currency and language preferences persist independently, site displays in French with EUR prices, checkout shows "Passer la commande" (French) with EUR totals, localization settings survive logout/login, database stores locale preferences per user correctly |
| **Test Data** | Currency: EUR<br>Language: Français<br>Product: €29.99 "Ajouter au panier" |
| **Screenshots/Logs** | Capture: French interface with EUR prices, persistence after logout/login |

---

## Summary of All Test Cases

| Feature | Test Case ID | Type | Priority | Expected Status |
|---------|--------------|------|----------|-----------------|
| Registration | TC_REG_001 | Happy Path | Critical | PASS |
| Registration | TC_REG_002 | Fail Case | High | PASS (validation works) |
| Registration | TC_REG_003 | Edge Case | High | PASS (validation works) |
| Registration | TC_REG_004 | Edge Case | High | PASS (validation works) |
| Login | TC_LOGIN_001 | Happy Path | Critical | PASS |
| Login | TC_LOGIN_002 | Fail Case | Critical | PASS (validation works) |
| Login | TC_LOGIN_003 | Edge Case | High | PASS (lockout works) |
| Login | TC_LOGIN_004 | Edge Case | Critical | PASS (security) |
| Search | TC_SEARCH_001 | Happy Path | Critical | PASS |
| Search | TC_SEARCH_002 | Fail Case | High | PASS (proper message) |
| Search | TC_SEARCH_003 | Edge Case | Medium | PASS (sanitization) |
| Search | TC_SEARCH_004 | Feature (Filters) | High | PASS |
| Search | TC_SEARCH_005 | Edge Case | Medium | PASS |
| Add to Cart | TC_CART_001 | Happy Path | Critical | PASS |
| Add to Cart | TC_CART_002 | Fail Case | Critical | PASS (validation) |
| Add to Cart | TC_CART_003 | Edge Case | High | PASS (validation) |
| Add to Cart | TC_CART_004 | Edge Case | Medium | PASS |
| Add to Cart | TC_CART_005 | Edge Case | High | PASS (price calc) |
| Checkout | TC_CHECKOUT_001 | Happy Path | Critical | PASS |
| Checkout | TC_CHECKOUT_002 | Fail Case | Critical | PASS (validation) |
| Checkout | TC_CHECKOUT_003 | Edge Case | High | PASS (validation) |
| Checkout | TC_CHECKOUT_004 | Edge Case | High | PASS (logic) |
| Wishlist | TC_WISHLIST_001 | Happy Path | Medium | PASS |
| Wishlist | TC_WISHLIST_002 | Feature | Medium | PASS |
| Wishlist | TC_WISHLIST_003 | Edge Case | Medium | PASS |
| Wishlist | TC_WISHLIST_004 | Edge Case | Low-Med | PASS |
| Comparison | TC_COMPARE_001 | Happy Path | Medium | PASS |
| Comparison | TC_COMPARE_002 | Edge Case | Medium | PASS |
| Comparison | TC_COMPARE_003 | Edge Case | Low-Med | PASS |
| Currency/Language | TC_CURRENCY_001 | Happy Path | Medium | PASS |
| Currency/Language | TC_CURRENCY_002 | Edge Case | High | PASS |
| Currency/Language | TC_LANGUAGE_001 | Happy Path | Medium | PASS |
| Currency/Language | TC_LOCALIZATION_001 | Edge Case | Low-Med | PASS |

**Total Test Cases: 32+** (exceeds 24 minimum requirement)