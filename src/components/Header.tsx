import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Text style={styles.backText}>Retour</Text>
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.notification}>
      <Text style={styles.notificationText}>0</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a3c9c0',
    padding: 10,
    justifyContent: 'space-between'
  },
  backButton: { padding: 5 },
  backText: { fontSize: 16, color: '#fff' },
  headerTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  notification: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationText: { color: '#a3c9c0', fontSize: 12 }
});
