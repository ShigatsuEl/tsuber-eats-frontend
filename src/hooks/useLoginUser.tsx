import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { LoginUserQuery } from "../__generated__/LoginUserQuery";

export const LOGIN_USER_QUERY = gql`
  query LoginUserQuery {
    loginUser {
      id
      email
      role
      verified
    }
  }
`;

export const useLoginUser = () => {
  return useQuery<LoginUserQuery>(LOGIN_USER_QUERY);
};
