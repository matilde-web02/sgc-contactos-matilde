//Tela inicial do app SGCL (Dashboard).
// Apresenta o cabeçalho em gradiente com o título "SGCL" e subtítulo
// "Gestão de clientes", o botão de menu hambúrguer que abre o menu flutuante
// ("Lista de clientes" e "Adicionar cliente") e o cartão central com o total
// de clientes registados.

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GradientHeader from '../components/GradientHeader';
import { TOTAL_REGISTERED_CLIENTS } from '../data/mockClients';
import { RootStackParamList } from '../types/client';
import { COLORS } from '../theme/colors';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleNavigateToList = () => {
    setMenuVisible(false);
    navigation.navigate('ClientsList');
  };

  const handleNavigateToAdd = () => {
    setMenuVisible(false);
    navigation.navigate('ClientForm', { mode: 'create' });
  };

  return (
    // Pressable externo permite fechar o menu flutuante ao tocar fora dele
    <Pressable style={styles.screen} onPress={() => setMenuVisible(false)}>
      <GradientHeader
        title="SGCL"
        subtitle="Gestão de clientes"
        isHome={true}
        showMenu={true}
        onMenuPress={() => setMenuVisible((prev) => !prev)}
      />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.statsCard}
          activeOpacity={0.9}
          onPress={handleNavigateToList}
        >
          <Text style={styles.statsLabel}>Clientes registados</Text>
          <Text style={styles.statsNumber}>{TOTAL_REGISTERED_CLIENTS}</Text>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleNavigateToList}
            activeOpacity={0.7}
          >
            <Ionicons name="reorder-three-outline" size={26} color={COLORS.primaryTeal} />
            <Text style={styles.menuItemText}>Lista de clientes</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleNavigateToAdd}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={26} color={COLORS.primaryTeal} />
            <Text style={styles.menuItemText}>Adicionar cliente</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
}

// Folha de estilos da tela inicial (HomeScreen)
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 28,
  },
  statsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 26,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  statsLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 14,
    fontWeight: '400',
  },
  statsNumber: {
    fontSize: 46,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 112,
    right: 22,
    width: 235,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '500',
    marginLeft: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
});
