import React, { useState, useEffect } from 'react'
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity
 } from 'react-native'
import { styles } from '../lib/styles'
import { themeFunction } from '../lib/utils'

interface ConfirmDeleteModalProps {
  visible: boolean
  isDarkMode: boolean
  onConfirm: (dontShowAgain: boolean) => void
  onCancel: () => void
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  visible,
  isDarkMode,
  onConfirm,
  onCancel,
}) => {
  const theme = themeFunction(isDarkMode)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    if (visible) {
      setDontShowAgain(false)
    }
  }, [visible])

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>Are you sure?</Text>
          <Text style={{ color: theme.text, marginBottom: 20 }}>
            This action cannot be undone.
          </Text>

          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
            onPress={() => setDontShowAgain(!dontShowAgain)}
          >
            <View style={{
              width: 20, height: 20, borderWidth: 1, borderColor: theme.text,
              marginRight: 10, justifyContent: 'center', alignItems: 'center',
              backgroundColor: dontShowAgain ? theme.accent : 'transparent'
            }}>
              {dontShowAgain && <Text style={{ color: '#FFF', fontSize: 12 }}>✓</Text>}
            </View>
            <Text style={{ color: theme.text }}>{`Don't show this again`}</Text>
          </TouchableOpacity>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, { backgroundColor: '#f44336' }]} 
              onPress={() => onConfirm(dontShowAgain)}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, { backgroundColor: '#CCC' }]} 
              onPress={onCancel}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}