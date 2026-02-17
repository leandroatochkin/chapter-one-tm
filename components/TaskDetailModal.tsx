import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ViewStyle,
  ScrollView,
  TextInput
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker' 
import { styles } from '../lib/styles'
import { themeFunction, reminderOptions } from '../lib/utils'
import { Task } from '../lib/interfaces'

interface TaskDetailModalProps {
  isDarkMode: boolean
  showTaskModal: boolean
  setShowTaskModal: (show: boolean) => void
  setSelectedTask: (task: Task | null) => void
  selectedTask: Task | null
  updateTask: (updatedTask: Task) => void
  getAlignmentStyle: () => ViewStyle
  completeTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isDarkMode,
  showTaskModal,
  setShowTaskModal,
  setSelectedTask,
  selectedTask,
  updateTask,
  getAlignmentStyle,
  completeTask,
  deleteTask
}) => {
  const theme = themeFunction(isDarkMode)

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDesc, setEditedDesc] = useState('')
  const [editedDeadline, setEditedDeadline] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    if (selectedTask) {
      setEditedTitle(selectedTask.title)
      setEditedDesc(selectedTask.description)
      // Convert stored ISO string back to Date object for the picker
      setEditedDeadline(selectedTask.deadline ? new Date(selectedTask.deadline) : null)
      setIsEditing(false)
    }
  }, [selectedTask])

  const handleClose = () => {
    setShowTaskModal(false)
    setSelectedTask(null)
    setIsEditing(false)
  }

  const handleSave = () => {
    if (selectedTask && editedTitle.trim()) {
      updateTask({
        ...selectedTask,
        title: editedTitle,
        description: editedDesc,
        deadline: editedDeadline ? editedDeadline.toISOString() : null,
        // If deadline is removed, we force-clear the reminder to follow your logic
        reminder: editedDeadline ? selectedTask.reminder : null,
      })
      setIsEditing(false)
    }
  }

  const handleReminderChange = (value: number) => {
    if (selectedTask && editedDeadline) {
      updateTask({ ...selectedTask, reminder: value })
    }
  }

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setEditedDeadline(selectedDate)
    }
  }

  if (!selectedTask) return null

  const currentReminderLabel = reminderOptions.find(
    (opt) => opt.value === selectedTask.reminder
  )?.label || 'No reminder set'

  return (
    <Modal
      visible={showTaskModal}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
          
          <View style={[
            { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
            getAlignmentStyle().alignItems === 'flex-end' ? { flexDirection: 'row-reverse' } : {}
          ]}>
            <View style={{ flex: 1 }}>
              {isEditing ? (
                <TextInput
                  style={[
                    styles.input,
                    { color: theme.text, fontSize: 20, fontWeight: 'bold', borderColor: theme.accent, marginBottom: 0 }
                  ]}
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                />
              ) : (
                <Text style={[styles.modalTitle, { color: theme.text, marginBottom: 0 }]}>
                  {selectedTask.title}
                </Text>
              )}
            </View>
            {!isEditing && (
              <TouchableOpacity onPress={handleClose} style={{ padding: 5, marginLeft: 10 }}>
                <Text style={{ color: theme.text, fontSize: 24, fontWeight: '300' }}>×</Text>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={styles.taskDetailScroll}>
            <Text style={[styles.sectionLabel, { color: theme.text + '99', fontSize: 12 }]}>DESCRIPTION</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.textArea, { color: theme.text, borderColor: theme.accent, marginTop: 5 }]}
                value={editedDesc}
                onChangeText={setEditedDesc}
                multiline
              />
            ) : (
              <Text style={[styles.taskDetailDescription, { color: theme.text }]}>
                {selectedTask.description || "No description provided."}
              </Text>
            )}

            {/* DEADLINE SECTION */}
            <Text style={[styles.sectionLabel, { color: theme.text, marginTop: 20 }]}>DEADLINE</Text>
            {isEditing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                  style={[styles.input, { flex: 1, justifyContent: 'center', borderColor: theme.border, marginTop: 5 }]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={{ color: editedDeadline ? theme.text : theme.text + '80' }}>
                    {editedDeadline ? editedDeadline.toLocaleDateString() : "No deadline set"}
                  </Text>
                </TouchableOpacity>
                {editedDeadline && (
                  <TouchableOpacity 
                    onPress={() => setEditedDeadline(null)}
                    style={{ marginLeft: 10, padding: 10 }}
                  >
                    <Text style={{ color: '#f44336' }}>Clear</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <Text style={{ color: theme.text, fontSize: 16, marginTop: 5 }}>
                📅 {selectedTask.deadline ? new Date(selectedTask.deadline).toLocaleDateString() : "No deadline"}
              </Text>
            )}

            {/* REMINDER SECTION */}
            <Text style={[styles.sectionLabel, { color: theme.text, marginTop: 20 }]}>
              REMINDER {!editedDeadline && isEditing && <Text style={{fontSize: 10, color: '#f44336'}}> (Set deadline first)</Text>}
            </Text>
            
            {isEditing ? (
              <View style={[styles.reminderOptions, !editedDeadline && { opacity: 0.5 }]}>
                {reminderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    disabled={!editedDeadline}
                    style={[
                      styles.reminderOption,
                      selectedTask.reminder === option.value && { backgroundColor: theme.accent },
                      { borderColor: theme.border },
                    ]}
                    onPress={() => handleReminderChange(option.value)}
                  >
                    <Text style={[styles.reminderOptionText, { color: selectedTask.reminder === option.value ? '#FFF' : theme.text }]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={{ color: theme.text, fontSize: 16, marginTop: 5 }}>
                🔔 {currentReminderLabel}
              </Text>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={editedDeadline || new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
          </ScrollView>

          <View style={[styles.modalButtons, getAlignmentStyle(), { marginTop: 20 }]}>
            {isEditing ? (
              <>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#4CAF50' }]} onPress={handleSave}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#CCC' }]} onPress={() => setIsEditing(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: theme.accent }]} onPress={() => setIsEditing(true)}>
                  <Text style={styles.modalButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                   style={[styles.modalButton, { backgroundColor: '#4CAF50' }]} 
                   onPress={() => { completeTask(selectedTask.id); handleClose(); }}
                >
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                   style={[styles.modalButton, { backgroundColor: '#f44336' }]} 
                   onPress={() => { deleteTask(selectedTask.id); handleClose(); }}
                >
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}