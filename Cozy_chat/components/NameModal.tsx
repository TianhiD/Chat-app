import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NameModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onDelete: () => void;
}

const NameModal: React.FC<NameModalProps> = ({ visible, onClose, onSave, onDelete }) => {
  const [name, setName] = useState<string>('');

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('user', name);
      onSave(name);
      onClose();
    } catch (error) {
      console.error('Failed to save the name.', error);
    }
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem('user');
      onDelete();
      onClose();
    } catch (error) {
      console.error('Failed to delete the user.', error);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter your name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Close" onPress={onClose} />
          <Button title="Delete User" onPress={handleDelete} color="orange" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Adjust value to move the modal up/down
  },
  modalView: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default NameModal;