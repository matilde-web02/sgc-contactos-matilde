import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ClientAvatar from './ClientAvatar';
import { Client } from '../types/client';
import { COLORS } from '../theme/colors';

interface ClientCardProps {
  client: Client;
  onPressCard: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

// Componente funcional ClientCard
export default function ClientCard({
  client,
  onPressCard,
  onPressEdit,
  onPressDelete,
}: ClientCardProps) {
  return (
    // Cartão principal clicável que navega para os detalhes do cliente
    <TouchableOpacity style={styles.card} onPress={onPressCard} activeOpacity={0.85}>
      <ClientAvatar initials={client.initials} variant="list" />

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {client.name}
        </Text>
        <Text style={styles.phone}>{client.phone}</Text>
        <Text style={styles.serviceInfo} numberOfLines={1}>
          {client.shortService} · {client.lastServiceDate}
        </Text>
      </View>

      <View style={styles.actionsColumn}>
        <TouchableOpacity
          style={[styles.iconCircle, styles.editCircle]}
          onPress={onPressEdit}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil-outline" size={18} color={COLORS.primaryTeal} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconCircle, styles.deleteCircle]}
          onPress={onPressDelete}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.dangerRed} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

//Estilos de Client-Card
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  serviceInfo: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  actionsColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editCircle: {
    backgroundColor: COLORS.softTealBg,
  },
  deleteCircle: {
    backgroundColor: COLORS.softRedBg,
  },
});
