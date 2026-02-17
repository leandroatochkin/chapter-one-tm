import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ViewStyle
} from 'react-native';
import { 
    styles
 } from '../lib/styles';
import { 
    themeFunction,
    reminderOptions
 } from '../lib/utils';
import { FormErrors } from '../lib/interfaces';

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
    setSelectedReminder: (value: number) => void,
    addTask: () => void
    getAlignmentStyle: () => ViewStyle
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
    getAlignmentStyle
}) => {

    const theme = themeFunction(isDarkMode)

    return (
        <Modal
                visible={showAddModal}
                transparent
                animationType="slide"
                statusBarTranslucent={true}
                navigationBarTranslucent={true}
                onRequestClose={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
              >
                <View style={styles.modalOverlay}>
                  <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
                    <Text style={[styles.modalTitle, { color: theme.text }]}>Add New Task</Text>
        
                    <TextInput
                      style={[
                        styles.input,
                        { color: theme.text, borderColor: errors.title ? '#f44336' : theme.border },
                      ]}
                      placeholder="Task Title"
                      placeholderTextColor={theme.text + '80'}
                      value={taskTitle}
                      onChangeText={(text) => {
                        setTaskTitle(text);
                        if (errors.title) setErrors({ ...errors, title: null });
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
                        setTaskDescription(text);
                        if (errors.description) setErrors({ ...errors, description: null });
                      }}
                      multiline
                      numberOfLines={4}
                    />
                    {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        
                    <Text style={[styles.sectionLabel, { color: theme.text }]}>
                      Set Reminder (Optional)
                    </Text>
                    <View style={styles.reminderOptions}>
                      {reminderOptions.map((option) => (
                        <TouchableOpacity
                          key={option.value}
                          style={[
                            styles.reminderOption,
                            selectedReminder === option.value && {
                              backgroundColor: theme.accent,
                            },
                            { borderColor: theme.border },
                          ]}
                          onPress={() => setSelectedReminder(option.value)}
                        >
                          <Text
                            style={[
                              styles.reminderOptionText,
                              {
                                color:
                                  selectedReminder === option.value ? '#FFF' : theme.text,
                              },
                            ]}
                          >
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
        
                    <View style={[styles.modalButtons, getAlignmentStyle()]}>
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