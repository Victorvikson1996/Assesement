import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Pisel from '../assest/svg/Pisel.svg';
import Gold from '../assest/svg/Gold.svg';
import ArrowLeft from '../assest/svg/ArrowLeft.svg';
import { Avatar } from './Avatar';
import { UserProfile } from '../services/api/AuthContext';

const zodiacSigns = [
  '',
  'Bélier',
  'Taureau',
  'Gémeaux',
  'Cancer',
  'Lion',
  'Vierge',
  'Balance',
  'Scorpion',
  'Sagittaire',
  'Capricorne',
  'Verseau',
  'Poissons'
];

export interface ProfileHeaderProps {
  user: UserProfile;
  onBack: () => void;
}

// Dynamic Wrapper to cover status bar and dynamic island
export const ProfileDynamicWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <StatusBar style='light' backgroundColor='#118787' />
      <View style={styles.wrapper}>{children}</View>
    </>
  );
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onBack
}) => {
  return (
    <>
      {/* Rectangular Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowLeft width={24} height={24} />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Mon profil</Text>

        <View style={styles.dynamicIsland}>
          <Gold width={18} height={18} />
          <Text style={styles.balance}>{user.cashBalance ?? 0}</Text>
          <Text style={styles.plus}>+</Text>
        </View>

        <View style={styles.profileInfo}>
          <Avatar firstname={user.firstname} lastname={user.lastname} />
          <View>
            <Text style={styles.greeting}>
              Bonjour <Text style={styles.bold}>{user.firstname}</Text> !
            </Text>
            <Text style={styles.zodiac}>
              {zodiacSigns[user.natalProfile?.zodiacSignId ?? 0]}
            </Text>
          </View>
        </View>
      </View>

      {/* Curve SVG underneath header */}
      <Pisel width='100%' preserveAspectRatio='none' />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#118787', // Covers Dynamic Island on iOS
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  headerContainer: {
    backgroundColor: '#118787',
    paddingTop: Platform.OS === 'ios' ? 44 : 25, // Account for status bar
    paddingBottom: 16,
    paddingHorizontal: 16
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 52 : 33, // Adjust for status bar
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2
  },
  backText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 16
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 12 : 12
  },
  dynamicIsland: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'ios' ? 48 : 29, // Adjust for status bar
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    elevation: 2,
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
      }
    })
  },
  balance: {
    color: '#11998e',
    fontWeight: 'bold',
    marginLeft: 4
  },
  plus: {
    color: '#4caf50',
    marginLeft: 4,
    fontWeight: 'bold'
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40
  },
  greeting: {
    color: '#fff',
    fontSize: 25,
    marginLeft: 16,
    marginTop: -20
  },
  bold: {
    fontWeight: 'bold'
  },
  zodiac: {
    color: '#9DD2CC',
    fontSize: 18,
    marginLeft: 16
  }
});
