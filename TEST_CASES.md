# Test Cases for Place of Oblivion Project

## Test Case 1: User Registration with Valid Data

**Test Case ID:** TC-USER-001  
**Name:** Successful User Registration  
**Description:** Verify that a new user can register with valid credentials and a token is stored in cookies

**Prerequisites:**

- System is running
- Database is accessible
- No user with the test email exists

**Test Data:**

- Username: "testuser123"
- Email: "test@example.com"
- Password: "ValidPass123!"

**Steps:**

1. Navigate to registration page
2. Enter username "testuser123"
3. Enter email "test@example.com"
4. Enter password "ValidPass123!"
5. Click "Register" button

**Expected Result:**

- User is successfully registered
- Success message is displayed
- User is redirected to profile page
- User record is created in database with correct data
- Authentication token is stored in HTTP-only secure cookie with 3-hour expiration
- Initial balance of 100 is created for the user

**Postconditions:**

- User account is created
- User can log in with new credentials
- User has an initial balance of 100

**Priority:** High  
**Status:** Not Executed  
**Comments:** This test verifies the user registration functionality including cookie-based authentication and initial balance creation.

## Test Case 2: Game Session with Insufficient Balance

**Test Case ID:** TC-GAME-001  
**Name:** Game Session Creation with Insufficient Balance  
**Description:** Verify system behavior when user attempts to play a game with insufficient balance

**Prerequisites:**

- User is logged in
- User has balance less than 10.00 (required bet amount)

**Test Data:**

- User Balance: 5.00
- Required Bet Amount: 10.00 (as defined in GameSessionService)

**Steps:**

1. Log in as test user
2. Navigate to game page
3. Attempt to play a game (POST to /GameSession/play)

**Expected Result:**

- System rejects game session creation with "Insufficient balance" error
- No game session record created in database
- User balance remains unchanged at 5.00
- Appropriate error message is displayed to the user

**Postconditions:**

- User balance remains at 5.00
- No game session created

**Priority:** High  
**Status:** Not Executed  
**Comments:** This test ensures the system properly validates balance requirements before allowing gameplay.

## Test Case 3: Balance Update After Winning Game

**Test Case ID:** TC-BALANCE-001  
**Name:** Balance Update After Winning Game  
**Description:** Verify correct balance update after winning game session with 'AAA' symbols

**Prerequisites:**

- User is logged in
- User has sufficient balance (at least 10.00)
- Game session results in win with 'AAA' symbols (mock this result)

**Test Data:**

- Initial Balance: 100.00
- Bet Amount: 10.00
- Win Symbols: "AAA"
- Prize Amount: 50.00 (as defined for symbol 'A')
- Expected Final Balance: 140.00 (100 - 10 + 50)

**Steps:**

1. Log in as test user
2. Mock random generator to return "AAA" for symbols
3. Play a game (POST to /GameSession/play)
4. Check balance update (GET /Balances/balance)
5. Check game session history (GET /GameSession/history)

**Expected Result:**

- Game session recorded with:
  - Symbols: "AAA"
  - IsWin: true
  - Prize: 50.00
- Balance decreased by bet amount (10.00) and increased by prize (50.00)
- Final balance is 140.00
- Game session appears in user's history

**Postconditions:**

- Balance updated to 140.00
- Game session recorded in database
- Game session appears in history

**Priority:** High  
**Status:** Not Executed  
**Comments:** This test verifies the game logic, prize calculation, and balance updating in a winning scenario.

## Test Case 4: User Authentication and Token Validation

**Test Case ID:** TC-AUTH-001  
**Name:** User Authentication and Token Validation  
**Description:** Verify authentication flow with token generation and cookie storage

**Prerequisites:**

- User exists in system
- User is not logged in

**Test Data:**

- Username: "existinguser"
- Email: "existing@example.com"
- Password: "ValidPass123!"

**Steps:**

1. Navigate to login page
2. Enter email "existing@example.com"
3. Enter password "ValidPass123!"
4. Click "Login" button
5. Navigate to profile page (/Users/profile)
6. Logout (POST /Users/logout)
7. Attempt to access profile page again

**Expected Result:**

- User successfully logs in
- Authentication token is stored in HTTP-only secure cookie
- Profile page shows correct user information
- After logout, cookie is deleted
- Attempting to access profile page redirects to login page

**Postconditions:**

- User is logged out
- Authentication cookie is removed
- Protected endpoints are no longer accessible

**Priority:** High  
**Status:** Not Executed  
**Comments:** This test verifies the complete authentication flow including token generation, storage, and revocation.

## Test Case 5: Game Symbol Generation and Win Condition

**Test Case ID:** TC-GAME-002  
**Name:** Game Symbol Generation and Win Condition  
**Description:** Verify the randomness and correctness of symbol generation and win condition logic

**Prerequisites:**

- Game session service is functioning
- Test environment allows manipulating random generation

**Test Data:**

- Various combinations of symbols ("AAA", "ABA", "ABC", etc.)
- Expected win conditions (matching symbols only)
- Expected prizes:
  - 'A': 50.00
  - 'B': 40.00
  - 'C': 30.00
  - 'D': 20.00
  - 'E': 10.00

**Steps:**

1. Create test method that directly tests the GenerateSymbols method
2. Test CheckWinCondition with various symbol combinations
3. Test CalculatePrize with winning combinations
4. Test complete game process with controlled symbol generation

**Expected Result:**

- Generated symbols contain exactly 3 characters from the possible set
- Win condition correctly identifies only matching symbols as wins
- Prize calculation returns correct amounts based on the symbol
- Game process correctly applies win/loss logic and prize calculation

**Postconditions:**

- All test assertions pass
- Symbol generation, win conditions, and prize calculations are verified

**Priority:** High  
**Status:** Not Executed  
**Comments:** This test verifies the core game logic, particularly focusing on randomization, win conditions, and prize calculations.
