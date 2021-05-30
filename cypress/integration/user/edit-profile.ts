describe("Edit Profile", () => {
  beforeEach(() => {
    cy.login("adminclient@gmail.com", "admin");
  });

  it("should go to /edit-profile by using the header", () => {
    cy.findByRole("button").click();
    cy.findByText("Profile").click();
    cy.findByText("Edit Profile").click();
    cy.wait(1000);
    cy.title().should("eq", "Edit Profile | Tsuber Eats");
  });

  it("should change email", () => {
    cy.visit("/profile/edit");
    cy.findByPlaceholderText(/email/i).clear().type("test@gmail.com");
    cy.findAllByRole("button").eq(1).click();
  });
});
