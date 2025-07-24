import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ArrowRight from '../assest/svg/ArrowRight.svg';
import ArrowGreen from '../assest/svg/Mask.svg';

export interface MenuItemProps {
  icon?: React.FC<any>;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  value,
  onPress,
  danger
}) => (
  <TouchableOpacity
    style={[styles.row, danger && styles.danger]}
    onPress={onPress}
  >
    {Icon && <Icon width={22} height={22} style={styles.icon} />}
    <Text style={[styles.label, danger && styles.dangerText]}>{label}</Text>
    {value && <Text style={styles.value}>{value}</Text>}
    <ArrowGreen width={18} height={18} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  icon: { marginRight: 12 },
  label: { flex: 1, fontSize: 16 },
  value: { color: '#888', marginRight: 8 },
  danger: { backgroundColor: '#fbe9e7' },
  dangerText: { color: '#d32f2f' }
});

export const SupporMenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  value,
  onPress,
  danger
}) => (
  <TouchableOpacity
    style={[styles.row, danger && styles.danger]}
    onPress={onPress}
  >
    {Icon && <Icon width={22} height={22} style={styles.icon} />}
    <Text style={[styles.label, danger && styles.dangerText]}>{label}</Text>
    {value && <Text style={styles.value}>{value}</Text>}
    <ArrowRight width={18} height={18} />
  </TouchableOpacity>
);

export const DeconnectMenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  value,
  onPress,
  danger
}) => (
  <TouchableOpacity
    style={[styles.row, danger && styles.danger]}
    onPress={onPress}
  >
    {Icon && <Icon width={22} height={22} style={styles.icon} />}
    <Text style={[styles.label, danger && styles.dangerText]}>{label}</Text>
    {value && <Text style={styles.value}>{value}</Text>}
  </TouchableOpacity>
);
