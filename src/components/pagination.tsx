import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Pagination: React.FC<IPaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <React.Fragment>
      {totalPages !== 0 && (
        <>
          {page > 1 && (
            <FontAwesomeIcon
              data-testid="left-btn"
              icon={faArrowLeft}
              className="font-medium text-2xl cursor-pointer focus:outline-none"
              onClick={onPrevPageClick}
            />
          )}
          <span
            data-testid="paginataion-text"
            className="mx-5 font-medium text-lg"
          >
            Page {page} of {totalPages}
          </span>
          {page !== totalPages && (
            <FontAwesomeIcon
              data-testid="right-btn"
              icon={faArrowRight}
              className="font-medium text-2xl cursor-pointer focus:outline-none"
              onClick={onNextPageClick}
            />
          )}
        </>
      )}
    </React.Fragment>
  );
};
