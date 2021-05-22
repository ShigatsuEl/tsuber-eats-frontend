import { useLocation } from "react-router";

export const useQueryParam = () => {
  return new URLSearchParams(useLocation().search);
};
