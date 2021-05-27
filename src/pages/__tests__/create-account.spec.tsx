import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { render, waitFor, RenderResult } from "../../test-utils";
import { CreateAccount } from "../create-account";

describe("<CreateAccount />", () => {
  let mockClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() =>
      expect(document.title).toBe("Create Account | Tsuber Eats")
    );
  });
});
