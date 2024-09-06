import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTranslation } from "react-i18next";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const GeographicalDistribution = ({ users }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {t("geographical_distribution_of_users")}
      </h2>
      <MapContainer
        style={{ height: "400px", width: "100%", zIndex: 0 }} 
        center={[20, 0]}
        zoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {users.map((user, index) => (
          <Marker
            key={index}
            position={[
              user.address.coordinates.lat,
              user.address.coordinates.lng,
            ]}
            icon={customIcon}
          >
            <Tooltip
              direction="top"
              offset={[0, -30]}
              opacity={1}
              permanent={false}
            >
              {user.firstName} {user.lastName} <br />
              {user.address.city}, {user.address.country}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeographicalDistribution;
