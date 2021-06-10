import React from "react";

interface IDeliverProps {
  lat: number;
  lng: number;
}

export const Delivery: React.FC<IDeliverProps> = ({ lat, lng }) => (
  <div
    // @ts-ignore
    lat={lat}
    lng={lng}
    className="text-lg"
  >
    🚛
  </div>
);
