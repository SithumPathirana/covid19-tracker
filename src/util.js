import numeral from 'numeral';
import { Circle, Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { Tooltip } from 'react-leaflet';

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000,
  },
};

// Draw circles in the map
export const showDataOnMap = (data, type = 'cases') => {
  data.map((country, key) => (
    <Marker
      key={country.id}
      position={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
    >
      <Circle
        center={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
        fillOpacity={0.4}
        color={casesTypeColors[type].hex}
        fillColor={casesTypeColors[type].hex}
        radius={200}
      />
    </Marker>
  ));
};
