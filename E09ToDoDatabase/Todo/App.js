import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAFSkmW6npKIO9Bpxzxk3tGIif1B2yB9mg",
  authDomain: "todo-a2a14.firebaseapp.com",
  projectId: "todo-a2a14",
  storageBucket: "todo-a2a14.appspot.com",
  messagingSenderId: "445685714829",
  appId: "1:445685714829:web:cb7103c8e7b0ba2d0cb7c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  const fetchTodoItems = async () => {
    const todosCol = collection(db, 'todos');
    const todoSnapshot = await getDocs(todosCol);
    const todos = todoSnapshot.docs.map(doc => ({
      id: doc.id,
      text: doc.data().text,
    }));
    setItems(todos);
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const addTodoItem = async () => {
    if (itemText !== '') {
      const newItemRef = await addDoc(collection(db, 'todos'), { text: itemText });
      const newItem = { id: newItemRef.id, text: itemText };
      setItems([...items, newItem]);
      setItemText('');
      Keyboard.dismiss();
    }
  };

  const removeItem = async (item) => {
    await deleteDoc(doc(db, 'todos', item.id));
    const newItems = items.filter(existingItem => existingItem.id !== item.id);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    if (itemText !== '') {
      const newItemRef = await addDoc(collection(db, 'todos'), { text: itemText });
      const newItem = { id: newItemRef.id, text: itemText };
      setItems([...items, newItem]);
      setItemText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput}
          value={itemText}
          onChangeText={(text) => setItemText(text)}
          placeholder="Write a new todo here"
        />
        <Button
          title="Add"
          style={styles.addTodoButton}
          onPress={addTodoItem}
        />
      </View>
      <ScrollView style={styles.list}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}>* {item.text}</Text>
            <Text
              style={styles.listItemDelete}
              onPress={() => removeItem(item)}
            >
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
    margin: 5
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput : {
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
    margin: 5
  },
  listItemText: {},
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold'
  }
});