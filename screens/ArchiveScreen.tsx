import { 
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native"
import { 
    themeFunction
 } from "../lib/utils"
import { 
    Task
 } from "../lib/interfaces"
import { 
    styles
 } from "../lib/styles"
import { 
    Ionicons
 } from '@expo/vector-icons'

interface ArchiveScreenProps {
    archivedTasks: Task[] | [],
    repeatTask: (task: Task) => void
    isDarkMode: boolean
    removeFromArchive: (id: string) => void
}

const ArchiveScreen: React.FC<ArchiveScreenProps> = ({
    archivedTasks,
    repeatTask,
    isDarkMode,
    removeFromArchive
}) => {

    const theme = themeFunction(isDarkMode)

    return (
        
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { color: theme.text }]}>Archive</Text>
            <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
                {archivedTasks.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={[styles.emptyText, { color: theme.text }]}>
                    No archived tasks
                    </Text>
                </View>
                ) : (
                archivedTasks.map((task) => (
                    <View
                    key={task.id}
                    style={[
                        styles.taskCard,
                        { backgroundColor: theme.cardBackground },
                        task.completed && styles.completedTask,
                        task.deleted && styles.deletedTask,
                    ]}
                    >
                    <View style={styles.taskCardContent}>
                        <View style={styles.taskInfo}>
                        <View style={styles.archiveStatusBadge}>
                            <Text
                            style={[
                                styles.archiveStatus,
                                { color: task.completed ? '#4CAF50' : '#f44336' },
                            ]}
                            >
                            {task.completed ? 'COMPLETED' : 'DELETED'}
                            </Text>
                        </View>
                        <Text style={[styles.taskTitle, { color: theme.text }]}>
                            {task.title}
                        </Text>
                        <Text style={[styles.taskPreview, { color: theme.text }]} numberOfLines={2}>
                            {task.description}
                        </Text>
                        </View>
                        <View style={styles.archiveActions}>
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: theme.accent }]}
                            onPress={() => repeatTask(task)}
                        >
                            <Ionicons name={'refresh-outline'} size={18} color={theme.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={() => removeFromArchive(task.id)}
                        >
                            <Ionicons name={'trash-outline'} size={18} color="#f44336" />
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                ))
                )}
            </ScrollView>
        </View>
    )
}

export default ArchiveScreen