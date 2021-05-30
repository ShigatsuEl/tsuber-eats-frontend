describe("Log In", () => {
  it("should go to homepage", () => {
    cy.visit("/").title().should("eq", "Login | Tsuber Eats");
  });

  it("can fill out the form", () => {
    cy.visit("/")
      .findByPlaceholderText(/email/i)
      .type("adminclient@gmail.com")
      .findByPlaceholderText(/password/i)
      .type("admin")
      .findByRole("button")
      .should("not.have.class", "pointer-events.none");
    // to do(Log in)
  });

  it("can see email | password validation errors", () => {
    cy.visit("/")
      .findByPlaceholderText(/email/i)
      .type("errorEmail")
      .findByRole("button")
      .should("have.text", "Must be entered in email format");
  });
});
