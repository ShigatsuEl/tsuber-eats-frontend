import React from "react";

interface IRestaurantListProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName: string;
  address: string;
}

export const RestaurantContainer: React.FC<IRestaurantListProps> = ({
  id,
  coverImg,
  name,
  categoryName,
  address,
}) => {
  return (
    <div key={id}>
      <div
        className="mb-3 py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <div className="flex justify-between border-b pb-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <span className="capitalize">{categoryName}</span>
      </div>
      <span className="inline-block pt-1 capitalize">{address}</span>
    </div>
  );
};
