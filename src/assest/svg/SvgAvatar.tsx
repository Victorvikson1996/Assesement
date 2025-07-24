import React from 'react';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface SvgAvatarProps {
  initials: string;
  size?: number;
}

export const SvgAvatar = ({ initials, size = 70 }: SvgAvatarProps) => (
  <Svg width={size} height={size}>
    <Circle cx={size / 2} cy={size / 2} r={size / 2} fill='#d1e7e7' />
    <SvgText
      x='50%'
      y='54%'
      fontSize={size / 2.3}
      fontWeight='bold'
      fill='#00796B'
      textAnchor='middle'
      alignmentBaseline='middle'
      fontFamily='NeueMontreal-Bold'
    >
      {initials}
    </SvgText>
  </Svg>
);
