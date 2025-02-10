Feature: User Login

  Scenario: Successful login
    Given the user is on the login page
    When the user enters valid "user@example.com" and "password123"
    Then the user should see "Welcome, User!"

  Scenario: Unsuccessful login
    Given the user is on the login page
    When the user enters invalid "user@example.com" and "wrongpassword"
    Then the user should see "Invalid credentials"