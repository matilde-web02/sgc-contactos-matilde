import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { COLORS } from '../theme/colors';

interface DeleteConfirmationModalProps {
  visible: boolean;
  clientName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

// Modal de confirmação reutilizável exibido quando o utilizador toca
// no botão "Eliminar" (seja na lista de clientes ou na tela de detalhes).
// Replica fielmente o diálogo centralizado com botões "Cancelar" e "Eliminar".
//
export default function DeleteConfirmationModal({
  visible,
  clientName = 'Ana Matos',
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* Fecha o diálogo ao tocar fora do cartão central */}
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          {/* Absorve o toque dentro do cartão para evitar fecho acidental */}
          <TouchableWithoutFeedback>
            <View style={styles.dialogCard}>
              <Text style={styles.title}>Eliminar cliente?</Text>

              <Text style={styles.message}>
                {clientName} será removida da lista. Esta ação não pode ser desfeita.
              </Text>

              <View style={styles.buttonsRow}>
                <PrimaryButton
                  title="Cancelar"
                  variant="outlineNeutral"
                  onPress={onCancel}
                  style={styles.actionButton}
                />

                <PrimaryButton
                  title="Eliminar"
                  variant="danger"
                  onPress={onConfirm}
                  style={styles.actionButton}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dialogCard: {
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 26,
    paddingHorizontal: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 13,
  },
});
