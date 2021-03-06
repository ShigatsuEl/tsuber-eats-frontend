describe("Log In", () => {
  it("should go to homepage", () => {
    cy.visit("/").title().should("eq", "Login | Tsuber Eats");
  });

  it("should see email | password validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("errorEmail");
    cy.findByRole("alert").should(
      "have.text",
      "Must be entered in email format"
    );
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "Email is required");
    cy.findByPlaceholderText(/email/i).type("admintest@gmail.com");
    cy.findByPlaceholderText(/password/i)
      .type("error")
      .clear();
    cy.findByRole("alert").should("have.text", "Password is required");
  });

  it("should log in", () => {
    cy.login("admintest@gmail.com", "admin");
  });
});
