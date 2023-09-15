import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  // use hooks to change number values
  const [number1, setNumber1] = useState('0');
  const [number2, setNumber2] = useState('0');
  const [result, setResult] = useState('0');

  const handleAddition = () => {
    const sum = parseFloat(number1) + parseFloat(number2);
    setResult(sum.toString());
  };

  const handleSubtraction = () => {
    const difference = parseFloat(number1) - parseFloat(number2);
    setResult(difference.toString());
  };

  const handleMultiplication = () => {
    const product = parseFloat(number1) * parseFloat(number2);
    setResult(product.toString());
  };

  const handleDivision = () => {
    if (parseFloat(number2) === 0) {
      setResult('Cannot divide by zero');
    } else {
      const quotient = parseFloat(number1) / parseFloat(number2);
      setResult(quotient.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.calculator}>Calculator</Text>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 1:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={number1}
            onChangeText={(text) => setNumber1(text)}
            style={{ textAlign: 'right' }}
            keyboardType={'numeric'}
          ></TextInput>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 2:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={number2}
            onChangeText={(text) => setNumber2(text)}
            style={{ textAlign: 'right' }}
            keyboardType={'numeric'}
          ></TextInput>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Button title=" +" onPress={handleAddition} />
        <Button title=" - " onPress={handleSubtraction} />
        <Button title=" * " onPress={handleMultiplication} />
        <Button title=" / " onPress={handleDivision} />
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Result:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={result}
            placeholder="0"
            style={{ textAlign: 'right' }}
            editable={false}
          ></TextInput>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculator: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
  },
  text: {
    backgroundColor: '#39F',
    justifyContent: 'center',
    padding: 5,
    width: 100,
    borderRadius: 5,
  },
  textInput: {
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#ADD8E6',
    width: 100,
    marginLeft: 5,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 220,
  },
});
