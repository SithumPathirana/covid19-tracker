import { Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import InfoBox from './InfoBox';
import Map from './Map';
import axios from './axios';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [mapZoom, setMapZoom] = useState(13);
  const [mapCountries, setMapCountires] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get('/countries');
      const data = response.data.map((item) => ({
        id: item.countryInfo._id,
        name: item.country,
        value: item.countryInfo.iso3,
      }));
      setCountries(data);
      setMapCountires(response.data);
      setTableData(sortData(response.data));
    }

    fetchCountries();
  }, []);

  const handleCountrySelect = (data) => {
    setCountryInfo(data);
    if (data.countryInfo) {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    } else {
      setMapCenter([51.505, -0.09]);
      setMapZoom(3);
    }
  };

  return (
    <div className="app">
      <div className="app-left">
        <Header
          countries={countries}
          onCountrySelect={handleCountrySelect}
        ></Header>

        <div className="info-boxes">
          <InfoBox
            title={'Coronavirus Cases'}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          ></InfoBox>
          <InfoBox
            title={'Recovered'}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          ></InfoBox>
          <InfoBox
            title={'Deaths'}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          ></InfoBox>
        </div>

        <Map
          countries={mapCountries}
          caseType="cases"
          center={mapCenter}
          zoom={mapZoom}
        ></Map>
      </div>
      <Card className="app-right">
        <CardContent>
          <h3> Live Cases by Country</h3>
          <Table tableData={tableData}></Table>
          <div className="graph">
            <h2> Worldwide new cases</h2>
            <LineGraph type="cases"> </LineGraph>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
