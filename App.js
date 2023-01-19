import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet, Text, View, TextInput,
  TouchableOpacity, Keyboard, ScrollView,
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState([]);
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* tambah scroll view supaya ketika list bertambah melebihi halaman dapat scroll ke bawah */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Task List */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>
            Today's Task List
          </Text>
          <View style={styles.items}>
            {/* Task List */}
            {
              taskItems.map(( item, index ) => {
                return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => completeTask(index)}
                    >
                      <Task text={item} />
                    </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      {/* Buat task baru */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Type A Task'} 
        value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()} >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input : {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#C0C0C0',
  }

});
