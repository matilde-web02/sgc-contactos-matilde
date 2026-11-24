import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

interface ClientAvatarProps {
  initials: string;
  // 'list' aplica o avatar compacto; 'detail' aplica o círculo grande com borda verde-água
  variant?: 'list' | 'detail';
}
// Componente funcional ClientAvatar
export default function ClientAvatar({ initials, variant = 'list' }: ClientAvatarProps) {
  const isDetail = variant === 'detail';

  return (
    <View style={[styles.baseCircle, isDetail ? styles.detailCircle : styles.listCircle]}>
      <Text style={[styles.baseText, isDetail ? styles.detailText : styles.listText]}>
        {initials}
      </Text>
    </View>
  );
}

// Folha de estilos dedicada ao componente ClientAvatar
const styles = StyleSheet.create({
  // Propriedades geométricas comuns a ambas as variantes circulares
  baseCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.softTealBg,
  },
  detailCircle: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 3.5,
    borderColor: COLORS.primaryTeal,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  baseText: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  listText: {
    fontSize: 18,
  },
  detailText: {
    fontSize: 32,
    fontWeight: '500',
  },
});
