import React, { useState, useEffect } from 'react'
import {
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import MainScreen from '@/screens/MainScreen'
import SettingsScreen from '@/screens/SettingsScreen'
import ArchiveScreen from '@/screens/ArchiveScreen'
import LoadingScreen from '@/screens/LoadingScreen'
import { AddTaskModal } from '@/components/AddTaskModal'
import { TaskDetailModal } from '@/components/TaskDetailModal'
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { NavigationBar } from '@/components/NavigationBar'
import { styles } from '../lib/styles'
import { Screens } from '../lib/interfaces'
import { themeFunction } from '../lib/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Haptics from 'expo-haptics'
import { showToast } from '@/lib/notifications'
import { RootSiblingParent } from 'react-native-root-siblings'




interface FormErrors {
  title?: string | null
  description?: string | null
}

interface Task {
  id: string
  title: string
  description: string
  reminder: number | null
  completed: boolean
  deleted?: boolean
  createdAt: Date
  archivedAt?: Date
}

export default function Index() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([])
  const [currentScreen, setCurrentScreen] = useState<Screens>('main') // main, archive, settings
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [selectedReminder, setSelectedReminder] = useState<number | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(true)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)


  const theme = themeFunction(isDarkMode)

  //load data on startup
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const savedTasks = await AsyncStorage.getItem('tasks')
        const savedArchive = await AsyncStorage.getItem('archivedTasks')
        const savedDarkMode = await AsyncStorage.getItem('isDarkMode')
        const savedDeleteWarning = await AsyncStorage.getItem('deleteWarning')

        if (savedTasks) {
            const parsed = JSON.parse(savedTasks).map((t: any) => ({
              ...t,
              createdAt: new Date(t.createdAt)
            }))
            setTasks(parsed);
          }
        if (savedArchive) setArchivedTasks(JSON.parse(savedArchive))
        if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode))
        if (savedDeleteWarning) setShowDeleteWarning(JSON.parse(savedDeleteWarning))
      } catch (e) {
        console.error("Failed to load data", e)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  //save Tasks and Archive whenever they change
  useEffect(() => {
    if (!isLoading) {
      const saveData = async () => {
        try {
          await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
          await AsyncStorage.setItem('archivedTasks', JSON.stringify(archivedTasks))
        } catch (e) {
          console.error("Save error", e)
        }
      }
      saveData()
    }
  }, [tasks, archivedTasks, isLoading])

  //save Settings whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
        await AsyncStorage.setItem('deleteWarning', JSON.stringify(showDeleteWarning))
      } catch (e) {
        console.error("Failed to save settings", e)
      }
    }
    saveSettings()
  }, [isDarkMode, showDeleteWarning])


  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!taskTitle.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!taskDescription.trim()) {
      newErrors.description = 'Description is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addTask = () => {
    if (!validateForm()) return

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      reminder: selectedReminder,
      deadline: deadline ? deadline.toISOString() : null, // Save as ISO string
      completed: false,
      createdAt: new Date(),
    }

    setTasks([...tasks, newTask])
    setDeadline(null)
    resetForm()
    setShowAddModal(false)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    showToast('Task added!', isDarkMode)
  }

  const resetForm = () => {
    setTaskTitle('')
    setTaskDescription('')
    setSelectedReminder(null)
    setErrors({})
  }

  const completeTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setArchivedTasks([
        ...archivedTasks,
        { ...task, completed: true, archivedAt: new Date() },
      ])
      setTasks(tasks.filter((t) => t.id !== taskId))
      setShowTaskModal(false)
      setSelectedTask(null)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      showToast('Task completed! Well done!', isDarkMode)
    }
  }

  const deleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setArchivedTasks([
        ...archivedTasks,
        { ...task, deleted: true, archivedAt: new Date() },
      ])
      setTasks(tasks.filter((t) => t.id !== taskId))
      setShowTaskModal(false)
      setSelectedTask(null)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
      showToast('Task deleted.', isDarkMode)
    }
  }

  const repeatTask = (task: Task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      deleted: false,
      createdAt: new Date(),
    }
    delete newTask.archivedAt
    setTasks([...tasks, newTask])
    showToast('Task added!', isDarkMode)
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    )   
    setSelectedTask(updatedTask)
    showToast('Task updated!', isDarkMode)
  }

  const removeFromArchive = (taskId: string) => {
    setArchivedTasks(archivedTasks.filter((t) => t.id !== taskId))
    showToast('Task deleted permanently.', isDarkMode)
  }

  const handleDeletePress = (id: string) => {
    if (showDeleteWarning) {
      setTaskToDelete(id)
      setIsConfirmModalVisible(true)
    } else {
      deleteTask(id)
    }
  }

  if (isLoading) {
    return <LoadingScreen 
              onLoadingComplete={() => setIsLoading(false)} 
              isDarkMode={isDarkMode}
              />
  }

  const renderMainScreen = () => {
    return <MainScreen 
              setShowAddModal={setShowAddModal}
              setSelectedTask={setSelectedTask}
              setShowTaskModal={setShowTaskModal}
              deleteTask={handleDeletePress}
              completeTask={completeTask}
              tasks={tasks}
              isDarkMode={isDarkMode}
            />
  }

  const renderArchiveScreen = () => {
    return <ArchiveScreen 
              archivedTasks={archivedTasks}
              repeatTask={repeatTask}
              isDarkMode={isDarkMode}
              removeFromArchive={removeFromArchive}
            />
  }

  const renderSettingsScreen = () => {
    return <SettingsScreen 
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              showDeleteWarning={showDeleteWarning}
              setShowDeleteWarning={setShowDeleteWarning}
            />
  }
    
  

  return (
    <RootSiblingParent>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {currentScreen === 'main' && renderMainScreen()}
      {currentScreen === 'archive' && renderArchiveScreen()}
      {currentScreen === 'settings' && renderSettingsScreen()}

      <NavigationBar 
        isDarkMode={isDarkMode}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />

      <AddTaskModal 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        resetForm={resetForm}
        isDarkMode={isDarkMode}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        errors={errors}
        setErrors={setErrors}
        selectedReminder={selectedReminder}
        setSelectedReminder={setSelectedReminder}
        addTask={addTask}
        deadline={deadline}
        setDeadline={setDeadline}
      />

      <TaskDetailModal 
        isDarkMode={isDarkMode}
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
        updateTask={updateTask}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />

      <ConfirmDeleteModal
        visible={isConfirmModalVisible}
        isDarkMode={isDarkMode}
        onCancel={() => setIsConfirmModalVisible(false)}
        onConfirm={(dontShowAgain) => {
          if (dontShowAgain) setShowDeleteWarning(false);
          if (taskToDelete) deleteTask(taskToDelete);
          setIsConfirmModalVisible(false);
        }}
      />
    </SafeAreaView>
    </RootSiblingParent>
  )
}

