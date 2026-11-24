//Tela de listagem de todos os clientes ("Clientes").
// Contém o cabeçalho em gradiente com seta de voltar e campo de pesquisa
// arredondado ("Procurar cliente"), a lista de cartões de clientes (Ana Matos,
// Carlos Neto, Marta Lopes), o botão flutuante circular (+) no canto inferior
// direito e o modal de confirmação ao tocar no ícone de lixeira.

import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GradientHeader from '../components/GradientHeader';
import ClientCard from '../components/ClientCard';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { MOCK_CLIENTS } from '../data/mockClients';
import { Client, RootStackParamList } from '../types/client';
import { COLORS } from '../theme/colors';

type ClientsListScreenProps = NativeStackScreenProps<RootStackParamList, 'ClientsList'>;

export default function ClientsListScreen({ navigation }: ClientsListScreenProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const filteredClients = MOCK_CLIENTS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
        // Contentor principal da tela de clientes
    <View style={styles.screen}>
      <GradientHeader
        title="Clientes"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      >
        {/* Barra de pesquisa branca em formato pílula dentro do cabeçalho */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={22} color={COLORS.textSecondary} />
          {/* Campo de texto para procurar cliente */}
          <TextInput
            style={styles.searchInput}
            placeholder="Procurar cliente"
            placeholderTextColor={COLORS.textPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </GradientHeader>

      {/* Lista rolável dos cartões de clientes */}
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ClientCard
            client={item}
            onPressCard={() => navigation.navigate('ClientDetails', { client: item })}
            onPressEdit={() => navigation.navigate('ClientForm', { mode: 'edit', client: item })}
            onPressDelete={() => setClientToDelete(item)}
          />
        )}
      />

      {/* Botão flutuante (+) para abrir o formulário de criação de cliente */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ClientForm', { mode: 'create' })}
      >
        <Ionicons name="add" size={34} color={COLORS.textWhite} />
      </TouchableOpacity>

      <DeleteConfirmationModal
        visible={Boolean(clientToDelete)}
        clientName={clientToDelete?.name}
        onCancel={() => setClientToDelete(null)}
        onConfirm={() => setClientToDelete(null)}
      />
    </View>
  );
}

// Folha de estilos da tela de Listagem de Clientes
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginTop: 18,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textDark,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 26,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryTeal,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 6,
  },
});
