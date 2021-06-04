import React from "react";

interface IDishProps {
  name: string;
  price: number;
  description: string;
}

export const Dish: React.FC<IDishProps> = ({ name, price, description }) => {
  return (
    <div className="flex flex-col border border-gray-400 py-4 px-5 pb-8 bg-lime-400 transition hover:border-gray-800">
      <h2 className="mb-2 text-3xl">{name}</h2>
      <span className="mb-8 opacity-70">{description}</span>
      <span>￦ {price}</span>
    </div>
  );
};
