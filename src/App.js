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

  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get('/countries');
      const data = response.data.map((item) => ({
        id: item.countryInfo._id,
        name: item.country,
        value: item.countryInfo.iso3,
      }));
      setCountries(data);
      setTableData(sortData(response.data));
    }

    fetchCountries();
  }, []);

  const handleCountrySelect = (data) => {
    setCountryInfo(data);
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

        <Map></Map>
      </div>
      <Card className="app-right">
        <CardContent>
          <h3> Live Cases by Country</h3>
          <Table tableData={tableData}></Table>
          <h2> Worldwide new cases</h2>
          <LineGraph> </LineGraph>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
