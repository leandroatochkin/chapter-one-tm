import React from "react"
import { 
    TouchableOpacity,
    View,
    Text    
} from "react-native"
import { 
    Ionicons
 } from "@expo/vector-icons"
import { 
    Task
} from "../lib/interfaces"
import { 
    styles
 } from "../lib/styles"
import { 
    themeFunction
 } from "../lib/utils"


interface TaskCardProps {
    task: Task
    setSelectedTask: (task: Task) => void
    setShowTaskModal: (mode: boolean) => void
    isDarkMode: boolean
    completeTask: (taskId: string) => void
    deleteTask: (taskId: string) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
    task,
    isDarkMode,
    setSelectedTask,
    setShowTaskModal,
    completeTask,
    deleteTask
}) => {

    const theme = themeFunction(isDarkMode)

    return (
        <TouchableOpacity
              key={task.id}
              style={[styles.taskCard, { backgroundColor: theme.cardBackground }]}
              onPress={() => {
                setSelectedTask(task)
                setShowTaskModal(true)
              }}
            >
              <View style={styles.taskCardContent}>
                <View style={styles.taskInfo}>
                  <Text style={[styles.taskTitle, { color: theme.text }]} numberOfLines={1}>
                    {task.title}
                  </Text>
                  <Text style={[styles.taskPreview, { color: theme.text }]} numberOfLines={2}>
                    {task.description}
                  </Text>
                  {task.deadline && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Ionicons name="calendar-outline" size={12} color={theme.text}/>
                        <Text style={{ fontSize: 12, color: isDarkMode ? '#aaa' : '#666' }}>
                         Due: {new Date(task.deadline).toLocaleDateString()}
                        </Text>
                        </View>
                        {task.reminder && (
                          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                          <Ionicons name="alarm-outline" size={12} color={theme.accent}/>  
                          <Text style={{ fontSize: 12, color: theme.accent, marginLeft: 2 }}>
                           Reminder set
                          </Text>
                          </View>
                        )}
                      </View>
                    )}
                </View>
                <View style={styles.taskActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.completeButton]}
                    onPress={(e) => {
                      e.stopPropagation()
                      completeTask(task.id)
                    }}
                  >
                     <Ionicons name={'checkmark-outline'} size={12} color={'#4CAF50'}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={(e) => {
                      e.stopPropagation()
                      deleteTask(task.id)
                    }}
                  >
                    <Ionicons name={'trash-outline'} size={12} color={'#f44336'}/>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
    )
}