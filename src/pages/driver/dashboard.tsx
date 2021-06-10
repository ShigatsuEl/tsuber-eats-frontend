import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface ICoords {
  latitude: number;
  longitude: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    latitude: 0,
    longitude: 0,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ latitude, longitude });
  };

  const onError = (positionError: GeolocationPositionError) => {
    console.log(positionError);
  };

  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setTimeout(() => {
      map.panTo(new maps.LatLng(driverCoords.latitude, driverCoords.longitude));
    }, 3000);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  return (
    <div>
      <div className="w-full overflow-hidden" style={{ height: "85vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCd6qBYXKaEb7TNIKZyWooyY-teIR4ozsA" }}
          defaultZoom={15}
          defaultCenter={{ lat: 37.5, lng: 127.5 }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
        ></GoogleMapReact>
      </div>
    </div>
  );
};
