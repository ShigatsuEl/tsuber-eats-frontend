import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

console.log(isLoggedInVar(), authToken());

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      // Query는 Field를 가지고 있고 Field는 Field값을 읽어오는 read메서드를 가지고 있다.
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
