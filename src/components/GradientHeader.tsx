import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

// Componente reutilizável de cabeçalho com fundo em gradiente
// (azul escuro para verde-água) e cantos inferiores arredondados, presente em todas as telas da app
interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showMenu?: boolean;
  onMenuPress?: () => void;
  isHome?: boolean;
  children?: ReactNode;
}

export default function GradientHeader({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  showMenu = false,
  onMenuPress,
  isHome = false,
  children,
}: GradientHeaderProps) {
  // Compensa a altura da barra de estado/notch para não sobrepor o título
  const insets = useSafeAreaInsets();

  return (
    // Renderiza o contentor com gradiente diagonal semelhante à imagem do protótipo
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientMiddle, COLORS.gradientEnd]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.95, y: 1 }}
      style={[
        styles.container,
        isHome ? styles.homeContainer : styles.innerContainer,
        { paddingTop: Math.max(insets.top, 20) + 12 },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradientStart} />

      <View style={styles.headerRow}>
        <View style={styles.leftContent}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={28} color={COLORS.textWhite} />
            </TouchableOpacity>
          )}

          <View>
            <Text style={[styles.title, isHome ? styles.homeTitle : styles.innerTitle]}>
              {title}
            </Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>

        {showMenu && (
          <TouchableOpacity
            onPress={onMenuPress}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.menuButton}
            activeOpacity={0.7}
          >
            <Ionicons name="menu" size={34} color={COLORS.textWhite} />
          </TouchableOpacity>
        )}
      </View>

      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  homeContainer: {
    paddingBottom: 56,
  },
  innerContainer: {
    paddingBottom: 26,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  homeTitle: {
    fontSize: 34,
    letterSpacing: 0.5,
  },
  innerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 16,
    marginTop: 6,
    fontWeight: '400',
  },
  menuButton: {
    padding: 4,
  },
});
