import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ProfileHeader } from '../components/ProfileHeader';
import {
  FavoritePsychicList,
  Psychic
} from '../components/FavoritePsychicList';
import {
  DeconnectMenuItem,
  MenuItem,
  SupporMenuItem
} from '../components/MenuItem';
import { BottomNav } from '../components/BottomNav';
import { getFavoritePsychics } from '../services/api/auth';
import { useAuth } from '../services/api/AuthContext';
import UserIcon from '../assest/svg/user.svg';
import Basket from '../assest/svg/basket.svg';
import Tag from '../assest/svg/tag.svg';
import LogOut from '../assest/svg/log-out.svg';

interface ProfileScreenProps {
  navigation: any; // Replace with correct navigation type if available
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState<Psychic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const favs = await getFavoritePsychics();
        setFavorites(favs);
      } catch (e) {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!user || loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size='large' color='#11998e' />
    );

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHeader user={user} onBack={() => navigation.goBack()} />
        <FavoritePsychicList favorites={favorites} />
        <View style={styles.menuSection}>
          <MenuItem
            icon={UserIcon}
            label='Mes informations personnelles'
            onPress={() => navigation.navigate('PersonalInfo')}
          />
          <MenuItem
            icon={Basket}
            label='Recharger mon compte'
            onPress={() => navigation.navigate('Recharge')}
          />
          <MenuItem
            icon={Tag}
            label='Mes achats'
            onPress={() => navigation.navigate('Purchases')}
          />
        </View>
        <View style={styles.SupportmenuSection}>
          <SupporMenuItem
            label='Support client'
            onPress={() => navigation.navigate('Support')}
          />
          <SupporMenuItem
            label='Préférences de paiement'
            value='Paypal'
            onPress={() => navigation.navigate('PaymentPreferences')}
          />
          <SupporMenuItem
            label='Préférences de communication'
            onPress={() => navigation.navigate('CommunicationPreferences')}
          />
          <SupporMenuItem
            label='Langue'
            value='Français'
            onPress={() => navigation.navigate('Language')}
          />
        </View>

        <DeconnectMenuItem
          icon={LogOut}
          label='Me déconnecter'
          onPress={logout}
        />
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { paddingBottom: 80 },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    marginBottom: 8
  },
  SupportmenuSection: {
    borderRadius: 12,
    margin: 16,
    marginBottom: 8
  },
  DecoonectmenuSection: {
    borderRadius: 12,
    margin: 16,
    marginBottom: 8
  }
});
