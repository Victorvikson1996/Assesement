import { NavigatorScreenParams } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

export type ScreenParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

export type AppNavigationProp<T extends keyof ScreenParamList> =
  StackNavigationProp<ScreenParamList, T>;

export type AppRouteProp<T extends keyof ScreenParamList> = RouteProp<
  ScreenParamList,
  T
>;
