import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getInitials = (firstname?: string, lastname?: string | null) => {
  if (!firstname) return '';
  if (lastname) return (firstname[0] + lastname[0]).toUpperCase();
  return firstname.slice(0, 2).toUpperCase();
};

export const Avatar = ({
  firstname,
  lastname,
  size = 64,
  backgroundColor = '#fff',
  textColor = '#11998e'
}: {
  firstname?: string;
  lastname?: string | null;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}) => (
  <View
    style={[
      styles.avatar,
      { width: size, height: size, borderRadius: size / 2, backgroundColor }
    ]}
  >
    <Text style={[styles.text, { color: textColor, fontSize: 20 }]}>
      {getInitials(firstname, lastname)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    borderColor: '#11998e'
  },
  text: {
    fontWeight: '500'
  }
});
