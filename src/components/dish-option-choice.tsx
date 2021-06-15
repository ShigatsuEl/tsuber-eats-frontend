import React from "react";

interface IDishOptionChoiceProps {
  isCustomer?: boolean;
  name: string;
  extra: number | null;
  isOrderStart?: boolean;
  isOptionChoiceSelected?: boolean;
  addOptionChoiceToItem?: () => void;
  removeOptionChoiceFromItem?: () => void;
}

export const DishOptionChoice: React.FC<IDishOptionChoiceProps> = ({
  isCustomer = false,
  name,
  extra,
  isOrderStart,
  isOptionChoiceSelected,
  addOptionChoiceToItem,
  removeOptionChoiceFromItem,
}) => {
  const onDishOptionChoiceClick = () => {
    if (addOptionChoiceToItem && removeOptionChoiceFromItem) {
      if (isOrderStart) {
        if (isOptionChoiceSelected) {
          removeOptionChoiceFromItem();
        } else {
          addOptionChoiceToItem();
        }
      }
    }
  };

  return (
    <React.Fragment>
      {isCustomer ? (
        <div
          className={`flex mt-1 ml-4 ${
            isOptionChoiceSelected && "bg-lime-600"
          }`}
          onClick={onDishOptionChoiceClick}
        >
          <h6 className="mr-2">{name}</h6>
          {extra ? <h6>+{extra}￦</h6> : <h6>+{extra}</h6>}
        </div>
      ) : (
        <div className={`flex mt-1 ml-4`}>
          <h6 className="mr-2">{name}</h6>
          {extra ? <h6>+{extra}￦</h6> : <h6>+{extra}</h6>}
        </div>
      )}
    </React.Fragment>
  );
};
