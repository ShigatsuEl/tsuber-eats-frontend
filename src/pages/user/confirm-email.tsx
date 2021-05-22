/* eslint-disable react-hooks/exhaustive-deps */
import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Loading from "../../components/loading";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useQueryParam } from "../../hooks/useQueryParam";
import {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../__generated__/VerifyEmailMutation";

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmailMutation($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const client = useApolloClient();
  const { data: loginUserData } = useLoginUser();
  const [verifyEmail] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });
  const param = useQueryParam();
  const history = useHistory();

  function onCompleted(data: VerifyEmailMutation) {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && loginUserData?.loginUser) {
      client.writeFragment({
        id: `User:${loginUserData.loginUser.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push("/");
    }
  }

  useEffect(() => {
    const code = param.get("code");
    if (code) {
      verifyEmail({
        variables: {
          verifyEmailInput: {
            code,
          },
        },
      });
    }
  }, []);

  return (
    <div className="confirm-email-container flex flex-col items-center pt-36">
      <h2 className="mb-4 font-semibold text-xl">Confirming email...</h2>
      <h4 className="text-medium text-gray-700">
        Please wait, Don't close this page.
      </h4>
      <Loading />
    </div>
  );
};
