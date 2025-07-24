import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export interface Psychic {
  id: string;
  avatar: string;
  firstname: string;
  online: boolean;
}

export interface FavoritePsychicListProps {
  favorites: Psychic[];
}

export const FavoritePsychicList: React.FC<FavoritePsychicListProps> = ({
  favorites
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Mes favoris</Text>
    <FlatList
      horizontal
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View
            style={[
              styles.statusDot,
              { backgroundColor: item.online ? '#4caf50' : '#ff9800' }
            ]}
          />
          <Text style={styles.name}>{item.firstname}</Text>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 16, marginLeft: 16 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 16,
    position: 'relative'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#11998e'
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 18,
    right: 8,
    borderWidth: 2,
    borderColor: '#fff'
  },
  name: { marginTop: 4, fontSize: 14 }
});
