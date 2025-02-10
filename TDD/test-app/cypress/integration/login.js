/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("the user is on the login page", () => {
  cy.visit("/"); // Use 'cy' instead of 'cypress'
});

When("the user enters valid {string} and {string}", (email, password) => {
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get("button").click();
});

Then("the user should see {string}", (message) => {
  cy.contains(message).should("be.visible");
});
