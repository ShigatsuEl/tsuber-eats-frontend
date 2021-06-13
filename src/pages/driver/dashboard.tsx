/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Delivery } from "../../components/delivery";
import { gql, useSubscription } from "@apollo/client";
import { DETAIL_ORDER_FRAGMENT } from "../../fragments";
import { OnCookedOrders } from "../../__generated__/OnCookedOrders";
import { Link } from "react-router-dom";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription OnCookedOrders {
    cookedOrders {
      ...DetailOrderResults
    }
  }
  ${DETAIL_ORDER_FRAGMENT}
`;

interface ICoords {
  latitude: number;
  longitude: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    latitude: 0,
    longitude: 0,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const { data: cookedOrdersData } = useSubscription<OnCookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ latitude, longitude });
  };

  const onError = (positionError: GeolocationPositionError) => {
    console.log(positionError);
  };
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setMap(map);
    setMaps(maps);
    map.panTo(
      new google.maps.LatLng(driverCoords.latitude, driverCoords.longitude)
    );
  };

  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.latitude,
              driverCoords.longitude
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.latitude + 0.05,
              driverCoords.longitude + 0.05
            ),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (response, _) => {
          directionsRenderer.setDirections(response);
        }
      );
    }
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrdersData]);

  useEffect(() => {
    if (map && maps) {
      map.panTo(
        new google.maps.LatLng(driverCoords.latitude, driverCoords.longitude)
      );
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(
            driverCoords.latitude,
            driverCoords.longitude
          ),
        },
        (response, status) => {
          console.log(response, status);
        }
      );
    }
  }, [driverCoords.latitude, driverCoords.longitude]);

  return (
    <div>
      <div className="w-full overflow-hidden" style={{ height: "50vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCd6qBYXKaEb7TNIKZyWooyY-teIR4ozsA" }}
          defaultZoom={16}
          defaultCenter={{ lat: 37.5, lng: 127.5 }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
        >
          <Delivery lat={driverCoords.latitude} lng={driverCoords.longitude} />
        </GoogleMapReact>
      </div>
      <div className=" max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center  text-3xl font-medium">
              New Coocked Order
            </h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              Pick it up soon @{" "}
              {cookedOrdersData?.cookedOrders.restaurant?.name}
            </h1>
            <Link
              to={`/orders/${cookedOrdersData?.cookedOrders.id}`}
              className="btn w-full  block  text-center mt-5"
            >
              Accept Challenge &rarr;
            </Link>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">
            No orders yet...
          </h1>
        )}
      </div>
    </div>
  );
};
