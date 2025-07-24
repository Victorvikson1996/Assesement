import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
  Text,
  SafeAreaView
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuth } from '@/services/api/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { AppNavigationProp, AppRouteProp } from '@/navigation/types';

interface LoginFormData {
  email: string;
  password: string;
}

type LoginProps = {
  navigation: AppNavigationProp<'LoginScreen'>;
  route: AppRouteProp<'LoginScreen'>;
};

export const LoginScreen = ({ navigation }: LoginProps) => {
  const { login, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    Keyboard.dismiss();
    try {
      console.log('Login data:', data.email, data.password);
      await login(data.email, data.password);

      Alert.alert('Login Successful');
      navigation.navigate('ProfileScreen');
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error.message || 'Invalid credentials or server error'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <View style={{ marginVertical: 16 }}>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label='Phone number or Email'
                  placeholder='Enter your phone number or email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label='Password'
                placeholder='Enter your password'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />
          <Button
            text={loading ? 'Loading...' : 'Login'}
            onPress={handleSubmit(onSubmit)}
          />
          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: 20 }}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Text>
              Forgotten your?{' '}
              <Text style={{ fontWeight: '700' }}>Reset Password</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa'
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 70,
    elevation: 2
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    fontFamily: 'NeueMontreal-Bold',
    marginBottom: 16
  }
});
