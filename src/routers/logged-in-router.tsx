import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import Loading from "../components/loading";
import { LoginUserQuery } from "../__generated__/LoginUserQuery";

const LOGIN_USER_QUERY = gql`
  query LoginUserQuery {
    loginUser {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, error, loading } = useQuery<LoginUserQuery>(LOGIN_USER_QUERY);
  if (!data || loading || error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <h1>{data.loginUser.role}</h1>
    </div>
  );
};
