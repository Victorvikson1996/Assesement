import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser as loginAPI, logoutUser, getUserProfile } from '../api/auth';

export interface UserProfile {
  alias: number;
  category: string;
  disabledPaymentMethods: any | null;
  email: string;
  firstname: string;
  genderId: number;
  id: string;
  lastname: string | null;
  natalProfile: {
    birthCity: string | null;
    birthCityId: string | null;
    birthDate: string;
    birthTime: string;
    chineseSignId: number;
    decan: number;
    elementId: number;
    unknownBirthTime: boolean;
    zodiacAscendantSignId: number | null;
    zodiacSignId: number;
  } | null;
  nickname: string | null;
  paymentCurrency: string;
  phoneNumberDetails: {
    countryCode?: string;
    phoneNumber?: string;
  } | null;
  postalAddress: {
    additionalAddress: string | null;
    administrativeArea: string | null;
    city: string | null;
    country: string | null;
    countryCode: string | null;
    street: string | null;
    streetNumber: string | null;
    zipCode: string | null;
  };
  userId: string;
  // These are not directly from the 'account' object but were in your original interface
  // Keeping them optional if they are derived or fetched separately
  cashBalance?: number;
  zodiacSign?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserProfile | null) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await loginAPI(email, password);

      // 🛠 FIX: Access authorizationToken and account directly from result
      if (!result.authorizationToken || !result.account) {
        throw new Error(
          'Invalid login response: Missing token or account data.'
        );
      }

      await AsyncStorage.setItem('authToken', result.authorizationToken);
      await AsyncStorage.setItem('user', JSON.stringify(result.account));
      setUser(result.account);
      console.log('User successfully logged in and stored.');
    } catch (e: any) {
      console.error('Login process failed:', e.message);
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      setUser(null);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } catch (e) {
      console.error(
        'Error during logout API call (may be token already invalidated):',
        e
      );
    } finally {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      setUser(null);
      setLoading(false);
      console.log('User logged out, local storage cleared.');
    }
  };

  const refreshProfile = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();
      if (profile) {
        await AsyncStorage.setItem('user', JSON.stringify(profile));
        setUser(profile);
        console.log('Profile refreshed successfully.');
      } else {
        console.warn(
          'refreshProfile: No profile data returned. Clearing user state.'
        );
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
    } catch (e) {
      console.error('Error refreshing profile:', e);
      // On error, assume token is invalid or session is gone, clear local storage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
        setUser,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
