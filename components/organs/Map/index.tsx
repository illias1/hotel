import React from "react";
import GoogleMapReact from "google-map-react";
import { createMapOptions, greatPlaceStyle, locations, K_SIZE, ILocation } from "./utils";
import { IHotelName } from "../../../utils/db";

interface IMarker {
  text: string;
  lat: number;
  lng: number;
}

const MyGreatPlaceWithHover: React.FC<IMarker> = ({ text }) => {
  const style = greatPlaceStyle;
  // @ts-ignore
  return <div style={style}>{text}</div>;
};

const mapCenter = { lat: 38.644119, lng: 0.04598 };

const markers = (location: IHotelName) => {
  let places = Object.values(locations);
  if (location) {
    places = [locations[location]];
  }
  return places.map((location) => (
    <MyGreatPlaceWithHover
      key={location.lng + location.lat}
      text={location.name}
      lat={location.lat}
      lng={location.lng}
    />
  ));
};

interface IMapProp {
  location?: IHotelName;
  height?: number;
}

const Map: React.FC<IMapProp> = ({ location, height }) => {
  return (
    <div
      style={{
        height: height || 500,
        width: "100%",
        borderRadius: "12px 12px 0px 0px !important",
        overflow: "hidden !important",
        backfaceVisibility: "hidden !important",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCyDzWCBWsP4WBwK7Odu8_qMRV_pAqDnQc" }}
        defaultCenter={mapCenter}
        defaultZoom={16}
        hoverDistance={K_SIZE / 2}
        options={createMapOptions}
      >
        {markers(location)}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
