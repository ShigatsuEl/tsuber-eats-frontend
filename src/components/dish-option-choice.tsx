import React from "react";

interface IDishOptionChoiceProps {
  name: string;
  extra: number | null;
  isOrderStart: boolean;
  isOptionChoiceSelected: boolean;
  addOptionChoiceToItem: () => void;
  removeOptionChoiceFromItem: () => void;
}

export const DishOptionChoice: React.FC<IDishOptionChoiceProps> = ({
  name,
  extra,
  isOrderStart,
  isOptionChoiceSelected,
  addOptionChoiceToItem,
  removeOptionChoiceFromItem,
}) => {
  const onDishOptionChoiceClick = () => {
    if (isOrderStart) {
      if (isOptionChoiceSelected) {
        removeOptionChoiceFromItem();
      } else {
        addOptionChoiceToItem();
      }
    }
  };

  return (
    <div
      className={`flex mt-1 ml-4 ${isOptionChoiceSelected && "bg-lime-600"}`}
      onClick={onDishOptionChoiceClick}
    >
      <h6 className="mr-2">{name}</h6>
      {extra ? <h6>+{extra}￦</h6> : <h6>+{extra}</h6>}
    </div>
  );
};
