import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [currencyCodes, setCurrencyCodes] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch all countries on initial load
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCountries([]);
    }
  };

  const handleChange = (event) => {
    setCurrencyCodes(event.target.value.toUpperCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const codesArray = currencyCodes.split(',').map((code) => code.trim());

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/currency/${codesArray.join(',')}`);
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCountries([]);
    }
  };

  return (
    <div className="App">
      <h2>* World By Currency *</h2>
      <div className="search-container">
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search By Currency INR,EUR,USD"
            value={currencyCodes}
            onChange={handleChange}
          />
          <button type="submit">
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              alt="Search Icon"
            />
          </button>
        </form>
      </div>
      <div className="countries">
        {countries.map((country) => (
          <div key={country.cca3} className="country">
            <img
              src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
              alt={`${country.name.common} flag`}
            />
            <p>
              <span className='bold-text'>Name: </span> {country.name.common}
            </p>

            <p>
             <span className='bold-text'> Capital: </span> {country.capital}
              
              </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;

