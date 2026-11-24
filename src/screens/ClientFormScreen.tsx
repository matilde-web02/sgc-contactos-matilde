import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GradientHeader from '../components/GradientHeader';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { RootStackParamList } from '../types/client';
import { COLORS } from '../theme/colors';

type ClientFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ClientForm'>;
//Tela reutilizável de formulário para Criar ("Adicionar cliente")
// ou Atualizar ("Editar cliente") um registo.
export default function ClientFormScreen({ navigation, route }: ClientFormScreenProps) {
  // Partilha o mesmo ecrã entre Criação e Edição conforme o parâmetro recebido na rota
  const mode = route.params?.mode || 'create';
  const existingClient = route.params?.client;

  const [name, setName] = useState<string>(existingClient ? existingClient.name : '');
  const [phone, setPhone] = useState<string>(existingClient ? existingClient.phone : '');
  const [address, setAddress] = useState<string>(existingClient ? existingClient.address : '');
  const [lastService, setLastService] = useState<string>(
    existingClient ? existingClient.lastService : ''
  );
  const [lastServiceDate, setLastServiceDate] = useState<string>(
    existingClient ? existingClient.lastServiceDate : ''
  );

  const headerTitle = mode === 'edit' ? 'Editar cliente' : 'Adicionar cliente';

  return (
    <View style={styles.screen}>
      <GradientHeader
        title={headerTitle}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <FormInput
          label="Nome"
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
        />

        <FormInput
          label="Telefone"
          placeholder="9XX XXX XXX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Endereço"
          placeholder="Rua e bairro"
          value={address}
          onChangeText={setAddress}
        />

        <FormInput
          label="Último serviço"
          placeholder="Ex.: Corte de cabelo"
          value={lastService}
          onChangeText={setLastService}
        />

        <FormInput
          label="Data do último serviço"
          placeholder="DD/MM/AAAA"
          value={lastServiceDate}
          onChangeText={setLastServiceDate}
        />

        <PrimaryButton
          title="Guardar cliente"
          variant="primary"
          onPress={() => navigation.goBack()}
          style={styles.submitButton}
        />
      </ScrollView>
    </View>
  );
}

// Folha de estilos da tela ClientFormScreen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
  formContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
  },
  submitButton: {
    marginTop: 14,
  },
});
