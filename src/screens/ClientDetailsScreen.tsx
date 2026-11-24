//Tela de visualização completa dos dados do cliente ("Detalhes do cliente").
// Exibe o cabeçalho em gradiente, o avatar circular grande sobreposto à borda
// inferior do cabeçalho, o nome centralizado, o cartão branco com os campos
// separados por linhas divisórias (Telefone, Endereço, Último serviço, Data do
// último serviço) e os dois botões inferiores ("Editar" e "Eliminar").

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GradientHeader from '../components/GradientHeader';
import ClientAvatar from '../components/ClientAvatar';
import PrimaryButton from '../components/PrimaryButton';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { MOCK_CLIENTS } from '../data/mockClients';
import { RootStackParamList } from '../types/client';
import { COLORS } from '../theme/colors';

type ClientDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ClientDetails'>;

export default function ClientDetailsScreen({ navigation, route }: ClientDetailsScreenProps) {
  // Recorre ao primeiro registo estático caso o ecrã seja acedido sem parâmetros
  const client = route.params?.client || MOCK_CLIENTS[0];
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <GradientHeader
        title="Detalhes do cliente"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <ClientAvatar initials={client.initials} variant="detail" />
          <Text style={styles.clientName}>{client.name}</Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{client.phone}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Endereço</Text>
            <Text style={styles.infoValue}>{client.address}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Último serviço</Text>
            <Text style={styles.infoValue}>{client.lastService}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Data do último serviço</Text>
            <Text style={styles.infoValue}>{client.lastServiceDate}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <PrimaryButton
            title="Editar"
            variant="primary"
            onPress={() => navigation.navigate('ClientForm', { mode: 'edit', client })}
            style={styles.actionButton}
          />

          <PrimaryButton
            title="Eliminar"
            variant="outlineDanger"
            onPress={() => setDeleteModalVisible(true)}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        clientName={client.name}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
}

// Folha de estilos da tela ClientDetailsScreen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 36,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 22,
  },
  clientName: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 14,
  },
  detailsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginBottom: 28,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  infoBlock: {
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  actionButton: {
    flex: 1,
  },
});
