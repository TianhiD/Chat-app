import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemWithSetter = async (key: string, setValue: (storedValue: string) => void) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      setValue(value);
    }
  } catch (error) {
    console.error(error);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
  console.log('Done.');
};
