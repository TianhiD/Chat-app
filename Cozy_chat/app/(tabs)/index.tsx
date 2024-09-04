import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NameModal from '@/components/NameModal';
import Post from '@/components/Post';
import { getItemWithSetter } from '@/utils/local_storage';

import backgroundImage from '@/assets/images/background.jpg'; 
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const App = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([
    { id: '1', title: 'Post 1', description: 'This is the first post' },
    { id: '2', title: 'Post 2', description: 'This is the second post' },
  ]);

  useEffect(() => {
    getItemWithSetter('user', setUserName);
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveUserName = async (name: string) => {
    await AsyncStorage.setItem('user', name);
    setUserName(name);
    handleCloseModal();
  };

  const handleDeleteUser = async () => {
    await AsyncStorage.removeItem('user');
    setUserName('');
    handleCloseModal();
  };

  const navigateToChatroom = () => {
    router.push('./chatroom');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={backgroundImage} 
        style={styles.imageBackground}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenModal}>
          <Ionicons name="logo-octocat" size={32} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cozy chat</Text>
          <TouchableOpacity>
            <Text style={styles.headerButton}>New Post</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{userName ? `Welcome, ${userName}` : 'No user created'}</Text>
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post title={item.title} description={item.description} />}
          keyExtractor={item => item.id}
        />
        <NameModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          onSave={handleSaveUserName}
          onDelete={handleDeleteUser}
        />
        <TouchableOpacity style={styles.chatIcon} onPress={navigateToChatroom}>
          <Ionicons name="chatbubbles" size={32} color="white" />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#b3b3f5', 
  },
  headerButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4343ba',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
    padding: 16,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4343ba',
    borderRadius: 50,
    padding: 15,
  },
});

export default App;