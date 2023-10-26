import React, { useState } from 'react';
import type {Node} from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';

import { Header, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import { Text } from 'react-native';
import WeatherForecast from './WeatherForecast';
import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App: () => Node = () => {

  const [modalVisible, setModalVisible] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cities, setCities] = useState([]);

  const openDialog = () => {
    setModalVisible(true);
  }

  const addCity = () => {
    setCities( [...cities,{id:Math.random(), name:cityName}]);
    setModalVisible(false);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const deleteCity = (id) => {
    let filteredArray = cities.filter(city => city.id !== id);
    setCities(filteredArray);
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      console.log("Cities saving error!");
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities');
      if (value !== null) {
        setCities(JSON.parse(value));
      }
    } catch (e) {
      console.log("Cities loading error!");
    }
  }

  useEffect(() => {
    getData(); 
  }, []);

  useEffect(() => {
    storeData(); 
  }, [cities]);
  

  return (
    <SafeAreaView>
      <Header
        centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff', onPress: openDialog }}
      />
      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <View>
          <Input
            onChangeText={ (text) => setCityName(text)}
            placeholder='Type cityname here'
          />
        </View>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>
      
      <ScrollView>
        {cities.map(city => (
          <WeatherForecast key={city.id} city={city} deleteCity={deleteCity}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
