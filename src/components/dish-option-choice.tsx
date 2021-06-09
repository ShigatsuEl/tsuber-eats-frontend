import React from "react";

interface IDishOptionChoiceProps {
  name: string;
  extra: number | null;
}

export const DishOptionChoice: React.FC<IDishOptionChoiceProps> = ({
  name,
  extra,
}) => {
  return (
    <div className="flex ml-4">
      <h6 className="mr-2">{name}</h6>
      {extra ? <h6>+{extra}￦</h6> : <h6>+{extra}</h6>}
    </div>
  );
};
