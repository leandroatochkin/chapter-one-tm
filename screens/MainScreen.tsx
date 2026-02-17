import { 
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { 
    reminderOptions,
    themeFunction
 } from "../lib/utils";
import { 
    Task
 } from "../lib/interfaces";
import { 
    styles
 } from "../lib/styles";
import { 
    Ionicons
 } from '@expo/vector-icons';


interface MainScreenProps {
    setSelectedTask: (task: Task) => void
    setShowTaskModal: (mode: boolean) => void
    setShowAddModal: (mode: boolean) => void
    deleteTask: (id: string) => void
    completeTask: (id: string) => void
    tasks: Task[] | []
    isDarkMode: boolean
}

const MainScreen: React.FC<MainScreenProps> = ({
    setSelectedTask,
    setShowTaskModal,
    setShowAddModal,
    deleteTask,
    completeTask,
    tasks,
    isDarkMode  
}) => {

   const theme = themeFunction(isDarkMode)

    return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>My Tasks</Text>
      <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No tasks yet. Tap + to add one!
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[styles.taskCard, { backgroundColor: theme.cardBackground }]}
              onPress={() => {
                setSelectedTask(task);
                setShowTaskModal(true);
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
                  {task.reminder && (
                    <View style={styles.reminderBadge}>
                      <Ionicons name={'timer'} size={12} color={theme.accent}/>
                      <Text style={[styles.reminderText, { color: theme.text }]}>
                        {reminderOptions.find((r) => r.value === task.reminder)?.label}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.taskActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.completeButton]}
                    onPress={(e) => {
                      e.stopPropagation();
                      completeTask(task.id);
                    }}
                  >
                     <Ionicons name={'checkmark-outline'} size={12} color={'#4CAF50'}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                  >
                    <Ionicons name={'trash-outline'} size={12} color={'#f44336'}/>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: theme.accent }]}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
    )
};

export default MainScreen