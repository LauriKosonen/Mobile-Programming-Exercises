import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSkmW6npKIO9Bpxzxk3tGIif1B2yB9mg",
  authDomain: "todo-a2a14.firebaseapp.com",
  projectId: "todo-a2a14",
  storageBucket: "todo-a2a14.appspot.com",
  messagingSenderId: "445685714829",
  appId: "1:445685714829:web:5d6597e08a4441460cb7c4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Banner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>ToDo example with React Native</Text>
    </View>
  );
}

function ToDoList() {
  const [items, setItems] = useState([]);
  const [itemText, setItemText] = useState("");
  const todoRef = database().ref('todos');

  useEffect(() => {
    const todoListener = todoRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todoItems = Object.entries(data).map(([id, item]) => ({ id, ...item }));
        setItems(todoItems);
      } else {
        setItems([]);
      }
    });

    return () => {
      todoRef.off('value', todoListener);
    };
  }, []);

  const addTodoItem = () => {
    if (itemText !== '') {
      const newItemRef = todoRef.push();
      newItemRef.set({ text: itemText });
      setItemText('');
      Keyboard.dismiss();
    }
  };

  const removeItem = (id) => {
    todoRef.child(id).remove();
  };

  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput}
          value={itemText}
          onChangeText={(text) => setItemText(text)}
          placeholder="Write a new todo here"
          onSubmitEditing={addTodoItem}
        />
        <Button title="Add" style={styles.addTodoButton} onPress={addTodoItem} />
      </View>
      <ScrollView style={styles.list}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}>* {item.text}</Text>
            <Text style={styles.listItemDelete} onPress={() => removeItem(item.id)}>
              X
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5,
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 2,
    flex: 1,
  },
  list: {
    color: 'black',
    margin: 2,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  listItemText: {},
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});