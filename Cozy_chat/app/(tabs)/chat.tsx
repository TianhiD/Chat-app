import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View, StyleSheet } from 'react-native';

const initialMessages = [
  { id: 1, message: 'Hello!' },
  { id: 2, message: 'How are you?' },
  { id: 3, message: 'I am fine, thank you!' },
  { id: 4, message: 'What about you?' },
  { id: 5, message: 'I am good, too!' },
];

const Chat = () => {
  const { userName } = useLocalSearchParams();
  const [messages, setMessages] = useState<Array<{ id: number; message: string }>>(initialMessages);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: Date.now(), message: message };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {userName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#cecef2',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 50,
  },
  messageItem: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderColor: '#4343ba',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  
});

export default Chat;