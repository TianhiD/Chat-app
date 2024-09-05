// Post.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PostProps {
  title: string;
  description: string;
}

const Post: React.FC<PostProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>🍁</Text> 
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#b3b3f5'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'darkslategray',
  },
});

export default Post;
