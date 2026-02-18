import React, {useState} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  ScrollView
} from 'react-native'
import { 
    styles
 } from '../lib/styles'
import { 
    themeFunction,
    reminderOptions
 } from '../lib/utils'
import { FormErrors } from '../lib/interfaces'
import { MobileDatePicker } from './DatePicker'
import { WebDatePicker } from './DatePickerWeb'


interface AddTaskModalProps {
    showAddModal: boolean
    setShowAddModal: (mode: boolean) => void
    resetForm: () => void
    isDarkMode: boolean
    taskTitle: string
    setTaskTitle: (title: string) => void
    errors: FormErrors
    setErrors: (error: FormErrors) => void
    taskDescription: string
    setTaskDescription: (description: string) => void
    selectedReminder: number | null
    setSelectedReminder: (value: number | null) => void
    addTask: () => void
    setDeadline: (date: Date | null) => void
    deadline: Date | null
}


export const AddTaskModal: React.FC<AddTaskModalProps> = ({
    showAddModal,
    setShowAddModal,
    resetForm,
    isDarkMode,
    taskTitle,
    setTaskTitle,
    errors,
    setErrors,
    taskDescription,
    setTaskDescription,
    selectedReminder,
    setSelectedReminder,
    addTask,
    setDeadline,
    deadline
}) => {
    
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const theme = themeFunction(isDarkMode)

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false)
        if (selectedDate) {
            setDeadline(selectedDate)
        } else {
            setDeadline(null)
            setSelectedReminder(null)
        }
    }

    return (
        <Modal
                visible={showAddModal}
                transparent
                animationType="slide"
                statusBarTranslucent={true}
                navigationBarTranslucent={true}
                onRequestClose={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
              >
                <View style={styles.modalOverlay}>
                  <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
                    <Text style={[styles.modalTitle, { color: theme.text }]}>Add New Task</Text>
                    <ScrollView>
                      <TextInput
                      style={[
                        styles.input,
                        { color: theme.text, borderColor: errors.title ? '#f44336' : theme.border },
                      ]}
                      placeholder="Task Title"
                      placeholderTextColor={theme.text + '80'}
                      value={taskTitle}
                      onChangeText={(text) => {
                        setTaskTitle(text)
                        if (errors.title) setErrors({ ...errors, title: null })
                      }}
                    />
                    {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        
                    <TextInput
                      style={[
                        styles.input,
                        styles.textArea,
                        { color: theme.text, borderColor: errors.description ? '#f44336' : theme.border },
                      ]}
                      placeholder="Task Description"
                      placeholderTextColor={theme.text + '80'}
                      value={taskDescription}
                      onChangeText={(text) => {
                        setTaskDescription(text)
                        if (errors.description) setErrors({ ...errors, description: null });
                      }}
                      multiline
                      numberOfLines={4}
                    />
                    {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

                    <Text style={[styles.sectionLabel, { color: theme.text, marginTop: 15 }]}>
                      Deadline (Optional)
                    </Text>

                    {Platform.OS === 'web' ? (
                      <WebDatePicker 
                        value={deadline} 
                        onChange={onDateChange} 
                        theme={theme} 
                      />
                    ) : (
                      <>
                        <TouchableOpacity 
                          style={[styles.input, { justifyContent: 'center', borderColor: theme.border }]}
                          onPress={() => setShowPicker(true)}
                        >
                          <Text style={{ color: deadline ? theme.text : theme.text + '80' }}>
                            {deadline ? deadline.toLocaleDateString() : "Select a date..."}
                          </Text>
                        </TouchableOpacity>

                        {showPicker && (
                          <MobileDatePicker
                            value={deadline || new Date()}
                            onChange={onDateChange}
                          />
                        )}
                      </>
                    )}
        
                    {Platform.OS !== 'web' &&                   
                    <>
                      <Text style={[styles.sectionLabel, { color: theme.text, marginTop: 20 }]}>
                      Set Reminder (Optional) 
                      {!deadline && <Text style={{ fontSize: 10, color: '#f44336' }}> (Select deadline first)</Text>}
                    </Text>

                    <View style={[styles.reminderOptions, !deadline && { opacity: 0.5 }]}>
                      {reminderOptions.map((option) => (
                        <TouchableOpacity
                          key={option.value}
                          disabled={!deadline} 
                          style={[
                            styles.reminderOption,
                            selectedReminder === option.value && {
                              backgroundColor: theme.accent,
                            },
                            { borderColor: theme.border },
                            !deadline && { backgroundColor: theme.border + '40' } 
                          ]}
                          onPress={() => setSelectedReminder(option.value)}
                        >
                          <Text
                            style={[
                              styles.reminderOptionText,
                              {
                                color: selectedReminder === option.value ? '#FFF' : theme.text,
                              },
                            ]}
                          >
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    </>
                    }
                    </ScrollView>
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={[styles.modalButton, { backgroundColor: '#CCC' }]}
                        onPress={() => {
                          setShowAddModal(false);
                          resetForm();
                        }}
                      >
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, { backgroundColor: theme.accent }]}
                        onPress={addTask}
                      >
                        <Text style={styles.modalButtonText}>Add Task</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
        </Modal>
    )
}