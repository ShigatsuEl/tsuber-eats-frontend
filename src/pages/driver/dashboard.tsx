/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Delivery } from "../../components/delivery";

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

  const onGetRouteClick = () => {
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
      <button onClick={onGetRouteClick}>Get Route</button>
    </div>
  );
};
