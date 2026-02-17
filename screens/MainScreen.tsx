import { 
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { 
    themeFunction
 } from "../lib/utils";
import { 
    Task
 } from "../lib/interfaces";
import { 
    styles
 } from "../lib/styles";
 import { TaskCard } from "@/components/TaskCard";


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
            <TaskCard
              key={task.id} 
              task={task}
              isDarkMode={isDarkMode}
              setSelectedTask={setSelectedTask}
              setShowTaskModal={setShowTaskModal}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
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