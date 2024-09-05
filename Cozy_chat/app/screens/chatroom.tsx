import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Chatroom: undefined;
  Chat: { userName: string };
};

type ChatroomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chatroom'
>;

type ChatroomScreenRouteProp = RouteProp<RootStackParamList, 'Chatroom'>;

type Props = {
  navigation: ChatroomScreenNavigationProp;
  route: ChatroomScreenRouteProp;
};

const users = [
  { id: 1, name: 'user 1' },
  { id: 2, name: 'user 2' },
  { id: 3, name: 'user 3' },
];

const Chatroom: React.FC<Props> = ({ navigation }) => {
  const handleChatSelect = (userName: string) => {
    navigation.navigate('Chat', { userName });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatSelect(item.name)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#cecef2',
    
  },
});

export default Chatroom;