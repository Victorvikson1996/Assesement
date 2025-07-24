import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  LeftIcon?: React.ReactNode;
};

export const Button = ({
  text,
  onPress,
  style,
  textStyle,
  LeftIcon
}: ButtonProps) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    {LeftIcon && <>{LeftIcon}</>}
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#439C9E',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    flexDirection: 'row'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'NeueMontreal-Bold'
  }
});
