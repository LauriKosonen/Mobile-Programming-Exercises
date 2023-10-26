import React from 'react';
import { Card } from 'react-native-elements';
import useAxios from 'axios-hooks';
import { Text } from 'react-native';
import { Button } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeatherForecast = (params) => {
  const city = params.city;
  const API_KEY = 'ef8b617a78125996451a0d095d1b4907'; 
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  const [{ data, loading, error }, refetch] = useAxios(
    URL + city.name + '&appid=' + API_KEY + '&units=metric'
  );

  const refreshForecast = () => {
    refetch();
  }

  const deleteCity = () => {
    params.deleteCity(city.id);
  }

  if (loading) return (
    <Card>
      <Card.Title>Loading....</Card.Title>
    </Card>
  )
  if (error) return (
    <Card>
      <Card.Title>Error loading weather forecast!</Card.Title>
    </Card>
  )
  return (
    <Card>
      <Card.Title>{city.name}</Card.Title>
      {data && (
        <>
          <Card.Divider />
          <Text>Main: {data.weather[0].main}</Text>
          <Text>Temp: {data.main.temp} °C</Text>
          <Text>Feels: {data.main.feels_like} °C</Text>
          <Text>Humidity: {data.main.humidity}%</Text>
          <Text>Pressure: {data.main.pressure} hPa</Text>
          <Card.Image source={{ uri: `https://openweathermap.org/img/w/${data.weather[0].icon}.png` }} />
          <Card.FeaturedSubtitle>{data.weather[0].description}</Card.FeaturedSubtitle>
          <Card.FeaturedTitle>{`${Math.round(data.main.temp)}°C`}</Card.FeaturedTitle>
          <Button
            title="Refresh"
            onPress={refreshForecast}
          />
          <Button
            title="Remove"
            onPress={deleteCity}
          />
        </>
      )}
    </Card>
  );
}

export default WeatherForecast;