import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`${
      canClick
        ? "bg-lime-600 hover:bg-lime-700"
        : "bg-gray-200 pointer-events-none"
    } py-2 font-medium text-lg text-white transition-colors`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
