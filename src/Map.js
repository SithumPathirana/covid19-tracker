import React from 'react';
import { MapContainer } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { Popup } from 'react-leaflet';

import './Leaflet.css';
import './Map.css';
import { Circle } from 'react-leaflet';
import numeral from 'numeral';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 60,
  },
  recovered: {
    hex: '#7dd71d',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    multiplier: 50,
  },
  deaths: {
    hex: '#fb4443',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 700,
  },
};

function Map({ countries, caseType = 'cases', center, zoom }) {
  console.log(countries);
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries.map((country) => (
          <Circle
            key={country.id}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[caseType].hex}
            fillColor={casesTypeColors[caseType].hex}
            radius={
              Math.sqrt(country[caseType]) *
              casesTypeColors[caseType].multiplier
            }
          >
            <Popup>
              <div className="info-container">
                <div
                  className="info-flag"
                  style={{
                    backgroundImage: `url(${country.countryInfo.flag})`,
                  }}
                />
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">
                  Cases: {numeral(country.cases).format('0.0a')}
                </div>
                <div className="info-recovered">
                  Recovered: {numeral(country.recovered).format('0.0a')}
                </div>
                <div className="info-deaths">
                  Deaths: {numeral(country.deaths).format('0.0a')}
                </div>
              </div>{' '}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
