import React, { useState } from "react";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryZoomContainerProps,
} from "victory";
import { GetOwnerRestaurantQuery } from "../__generated__/GetOwnerRestaurantQuery";

interface IVictoryProps {
  className?: string;
  data?: GetOwnerRestaurantQuery;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Victory: React.FC<IVictoryProps> = ({ className, data }) => {
  const [zoomDomain, setZoomDomain] = useState<
    VictoryZoomContainerProps["zoomDomain"]
  >({
    x: [new Date(2020, 1, 1), new Date()],
  });

  const getFormatDate = (tick: any) => {
    let time = new Date(tick);
    const month = months[time.getMonth()];
    const day = days[time.getDay()];
    const date = time.getDate();
    return `on ${day}, ${month} ${date}`;
  };

  return (
    <div className={className}>
      <VictoryChart
        width={window.innerWidth}
        height={470}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={(domain) => setZoomDomain(() => domain)}
          />
        }
      >
        <VictoryLine
          labels={({ datum }) => `(￦)${datum.y}`}
          labelComponent={
            <VictoryLabel
              renderInPortal
              style={{ fontSize: 18, opacity: 0.7 } as any}
              dy={-20}
            />
          }
          interpolation="natural"
          style={{
            data: { stroke: "#84CC16" },
          }}
          data={data?.getOwnerRestaurant.restaurant?.orders.map((order) => ({
            x: new Date(order.createdAt),
            y: order.total,
          }))}
        />
      </VictoryChart>
      <VictoryChart
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        width={window.innerWidth}
        height={100}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={(domain) => setZoomDomain((current) => domain)}
          />
        }
      >
        <VictoryAxis tickFormat={(tick) => getFormatDate(tick)} />
        <VictoryLine
          style={{
            data: { stroke: "#84CC16" },
          }}
          data={data?.getOwnerRestaurant.restaurant?.orders.map((order) => ({
            x: order.createdAt,
            y: order.total,
          }))}
        />
      </VictoryChart>
    </div>
  );
};
