describe("Create Account", () => {
  it("should see email | password validation errors", () => {
    cy.visit("/");
    cy.findByText(/create an account/i).click();
    cy.findByPlaceholderText(/email/i).type("test");
    cy.findByRole("alert").should(
      "have.text",
      "Must be entered in email format"
    );
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "Email is required");
    cy.findByPlaceholderText(/email/i).type("test@gmail.com");
    cy.findByPlaceholderText(/password/i)
      .type("test")
      .clear();
    cy.findByRole("alert").should("have.text", "Password is required");
  });

  it("should create account and log in", () => {
    cy.visit("/create-account");
    cy.findByPlaceholderText(/email/i).type("admintest@gmail.com");
    cy.findByPlaceholderText(/password/i).type("admin");
    cy.findByRole("button").click();
    cy.wait(1000);
    cy.window().its("localStorage.tsuber-token").should("be.a", "string");
  });
});
