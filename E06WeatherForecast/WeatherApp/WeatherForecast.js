import React from 'react';
import { Card } from 'react-native-elements';

const WeatherForecast = ({ city }) => {
  return (
    <Card>
      <Card.Title>{city.name}</Card.Title>
    </Card>
  );
};

export default WeatherForecast;