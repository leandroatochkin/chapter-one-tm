import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Animated,
  StatusBar,
  ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainScreen from '@/screens/MainScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import ArchiveScreen from '@/screens/ArchiveScreen';
import { AddTaskModal } from '@/components/AddTaskModal';
import { TaskDetailModal } from '@/components/TaskDetailModal';
import { NavigationBar } from '@/components/NavigationBar';
import { styles } from '../lib/styles';
import { Alignment, Screens } from '../lib/interfaces';
import { themeFunction } from '../lib/utils';




interface FormErrors {
  title?: string | null;
  description?: string | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  reminder: number | null;
  completed: boolean;
  deleted?: boolean; // Optional for archive logic
  createdAt: Date;
  archivedAt?: Date;
}

interface LoadingScreenProps {
  onLoadingComplete: () => void
}



// Loading Screen Component
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(onLoadingComplete, 100);
    });
  }, [onLoadingComplete, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingTitle}>Task Manager</Text>
      <View style={styles.loadingBarContainer}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};





export default function Index() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([])
  const [currentScreen, setCurrentScreen] = useState<Screens>('main') // main, archive, settings
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [buttonAlignment, setButtonAlignment] = useState<Alignment>('center') // left, center, right
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Form states
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')
  const [selectedReminder, setSelectedReminder] = useState<number | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})


  const theme = themeFunction(isDarkMode)


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
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask])
    resetForm()
    setShowAddModal(false);
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
    }
  };

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
    }
  };

  const repeatTask = (task: Task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      deleted: false,
      createdAt: new Date(),
    }
    delete newTask.archivedAt;
    setTasks([...tasks, newTask]);
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    )
    // Also update selectedTask so the modal UI refreshes immediately
    setSelectedTask(updatedTask)
}

  const removeFromArchive = (taskId: string) => {
    setArchivedTasks(archivedTasks.filter((t) => t.id !== taskId))
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  const getAlignmentStyle = (): ViewStyle => {
  return {
    alignItems:
      buttonAlignment === 'left'
        ? 'flex-start'
        : buttonAlignment === 'right'
        ? 'flex-end'
        : 'center',
  }
}

  // Render Main Screen
  const renderMainScreen = () => {
    return <MainScreen 
              setShowAddModal={setShowAddModal}
              setSelectedTask={setSelectedTask}
              setShowTaskModal={setShowTaskModal}
              deleteTask={deleteTask}
              completeTask={completeTask}
              tasks={tasks}
              isDarkMode={isDarkMode}
            />
  }

  // Render Archive Screen
  const renderArchiveScreen = () => {
    return <ArchiveScreen 
              archivedTasks={archivedTasks}
              repeatTask={repeatTask}
              isDarkMode={isDarkMode}
              removeFromArchive={removeFromArchive}
            />
  }

  // Render Settings Screen
  const renderSettingsScreen = () => {
    return <SettingsScreen 
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              getAlignmentStyle={getAlignmentStyle}
              setButtonAlignment={setButtonAlignment}
              buttonAlignment={buttonAlignment}
            />
  }
    
  

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Main Content */}
      {currentScreen === 'main' && renderMainScreen()}
      {currentScreen === 'archive' && renderArchiveScreen()}
      {currentScreen === 'settings' && renderSettingsScreen()}

      {/* Bottom Navigation */}
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
        getAlignmentStyle={getAlignmentStyle}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal 
        isDarkMode={isDarkMode}
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
        updateTask={updateTask}
        getAlignmentStyle={getAlignmentStyle}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />
    </SafeAreaView>
  )
}

