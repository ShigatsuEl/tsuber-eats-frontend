import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import Loading from "../../components/loading";
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
  const [verifyEmail, { loading }] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION);
  const param = useQueryParam();

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
