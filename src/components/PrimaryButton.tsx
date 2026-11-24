// Componente reutilizável de botão em formato pílula (borderRadius
// elevado) que suporta quatro variantes visuais presentes no protótipo:
// - 'primary': fundo verde-água sólido e texto branco ("Guardar cliente", "Editar").
// - 'danger': fundo vermelho sólido e texto branco ("Eliminar" no modal).
// - 'outlineDanger': fundo branco, borda e texto vermelhos ("Eliminar" nos detalhes).
// - 'outlineNeutral': fundo branco, borda cinza e texto escuro ("Cancelar" no modal).

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';

type ButtonVariant = 'primary' | 'danger' | 'outlineDanger' | 'outlineNeutral';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  style,
}: PrimaryButtonProps) {
  // Mapeia cada variante visual do protótipo para os respectivos estilos de fundo e borda
  const getContainerStyle = () => {
    switch (variant) {
      case 'danger':
        return styles.dangerContainer;
      case 'outlineDanger':
        return styles.outlineDangerContainer;
      case 'outlineNeutral':
        return styles.outlineNeutralContainer;
      case 'primary':
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outlineDanger':
        return styles.outlineDangerText;
      case 'outlineNeutral':
        return styles.outlineNeutralText;
      case 'danger':
      case 'primary':
      default:
        return styles.solidText;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.baseButton, getContainerStyle(), style]}
    >
      <Text style={[styles.baseText, getTextStyle()]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: COLORS.primaryTeal,
  },
  dangerContainer: {
    backgroundColor: COLORS.dangerRed,
  },
  outlineDangerContainer: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1.5,
    borderColor: COLORS.dangerRedBorder,
  },
  outlineNeutralContainer: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1.5,
    borderColor: COLORS.borderMedium,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  solidText: {
    color: COLORS.textWhite,
  },
  outlineDangerText: {
    color: COLORS.dangerRed,
  },
  outlineNeutralText: {
    color: COLORS.textDark,
  },
});
