import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadProgressBar } from 'x-axios-progress-bar'

import { Table } from './Table';

export const LandingPage = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    locationSetter(data);
    weatherSetter(data);
  }, [data]);

  const fetchData = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=austin&appid=${apiKey}`)
    .then(response => {
      setData(response);
    })
    .catch(error => {
      console.log('Error fetching data: ', error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const weatherSetter = dataObject => {
    if (dataObject) {
      const entries = Object.entries(dataObject.data.main);
      setWeather(entries);
    }
  }

  const locationSetter = dataObject => {
    if (dataObject) {
      const name = dataObject.data.name;
      setLocation(name);
    }
  }

  loadProgressBar();
  
  if (loading) return <h4>'Loading...'</h4>
  if (error) return <h4>'Error!'</h4>

  return (
    <>
      <h1>Current { location } Weather</h1>
      <Table tableRows={weather} />
    </>
  )
}
