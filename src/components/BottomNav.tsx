import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Accueil from '../assest/svg/Accueil.svg';
import Voyan from '../assest/svg/Voyan.svg';
import Discution from '../assest/svg/Discution.svg';
import Basket from '../assest/svg/Botique.svg';

export interface BottomNavProps {
  navigation: any;
}

export const BottomNav: React.FC<BottomNavProps> = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Home')}
    >
      <Accueil width={24} height={24} />
      <Text style={styles.label}>Accueil</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Voyants')}
    >
      <Voyan width={24} height={24} />
      <Text style={styles.label}>Voyants</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Discussions')}
    >
      <Discution width={24} height={24} />
      <Text style={styles.label}>Discussions</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Boutique')}
    >
      <Basket width={18} height={24} />
      <Text style={styles.label}>Boutique</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#118787',
    paddingVertical: 10,
    marginVertical: 30
  },
  item: {
    alignItems: 'center'
  },
  label: {
    color: '#fff',
    fontSize: 13,
    marginTop: 2
  }
});
