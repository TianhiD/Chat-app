import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NameModal from '@/components/NameModal';
import Post from '@/components/Post';
import { getItemWithSetter } from '@/utils/local_storage';

import backgroundImage from '@/assets/images/background.jpg'; 

const App = () => {
  const [userName, setUserName] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={backgroundImage} // Use the imported image
        style={styles.imageBackground}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenModal}>
            <Text style={styles.headerButton}>Create User</Text>
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
    fontSize: 16,
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
});

export default App;