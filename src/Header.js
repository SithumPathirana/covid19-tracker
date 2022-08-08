import React, { useEffect, useState } from 'react';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import './Header.css';
import axios from './axios';

//
//

function Header({ onCountrySelect ,countries}) {
  const [country, setCountry] = useState('worldwide');

   useEffect(() => {
    async function fetchAllCountriesData() {
      const response = await axios.get('/all');
      onCountrySelect(response.data);
    }

    fetchAllCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const fetchUrl =
      countryCode === 'worldwide' ? '/all' : `/countries/${countryCode}`;

    const response = await axios.get(fetchUrl);
    onCountrySelect(response.data);
  };

  return (
    <div className="header">
      <h1> COVID-19 Tracker</h1>

      <FormControl className="header_dropdown">
        <Select
          variant="outlined"
          autoWidth
          value={country}
          onChange={onCountryChange}
        >
          <MenuItem value="worldwide"> Worldwide </MenuItem>
          {countries.map((country) => {
            return (
              <MenuItem key={country.id} value={country.value}>
                {' '}
                {country.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
