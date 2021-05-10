import React from "react";
import GoogleMapReact from "google-map-react";
import { createMapOptions, greatPlaceStyle, locations, K_SIZE } from "./utils";

interface IMarker {
  text: string;
  lat: number;
  lng: number;
}

const MyGreatPlaceWithHover: React.FC<IMarker> = ({ text }) => {
  const style = greatPlaceStyle;

  return <div style={style}>{text}</div>;
};

const mapCenter = { lat: 38.644119, lng: 0.045980 };

const markers = (locations) => {
  return locations.map((location) => (
    <MyGreatPlaceWithHover text={location.name} lat={location.lat} lng={location.lng} />
  ));
};

const Map: React.FC = () => {
  return (
    <div style={{ height: 500, width: 500 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCyDzWCBWsP4WBwK7Odu8_qMRV_pAqDnQc" }}
        defaultCenter={mapCenter}
        defaultZoom={16}
        hoverDistance={K_SIZE / 2}
        options={createMapOptions}
      >
        {markers(locations)}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
