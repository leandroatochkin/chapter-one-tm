import { 
    View,
    Text,
    TouchableOpacity
} from "react-native"
import { 
    themeFunction
 } from "../lib/utils"
import { 
    styles
 } from "../lib/styles"

 interface SettingScreenProps {
    isDarkMode: boolean,
    setIsDarkMode: (mode: boolean) => void
    showDeleteWarning: boolean
    setShowDeleteWarning: (val: boolean) => void
 }

const SettingsScreen: React.FC<SettingScreenProps> = ({
    isDarkMode,
    setIsDarkMode,
    showDeleteWarning,
    setShowDeleteWarning
 }) => {

    const theme = themeFunction(isDarkMode)

    return(
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { color: theme.text }]}>Settings</Text>
            <View style={styles.settingsContent}>
                <View style={styles.settingItem}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
                <TouchableOpacity
                    style={[
                    styles.toggle,
                    isDarkMode && { backgroundColor: theme.accent },
                    { backgroundColor: isDarkMode ? theme.accent : '#CCC' },
                    ]}
                    onPress={() => setIsDarkMode(!isDarkMode)}
                >
                    <View
                    style={[
                        styles.toggleThumb,
                        isDarkMode && styles.toggleThumbActive,
                    ]}
                    />
                </TouchableOpacity>
                </View>
                <View style={styles.settingItem}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>Delete Confirmation</Text>
                    <TouchableOpacity
                        style={[styles.toggle, { backgroundColor: showDeleteWarning ? theme.accent : '#CCC' }]}
                        onPress={() => setShowDeleteWarning(!showDeleteWarning)}
                    >
                        <View style={[styles.toggleThumb, showDeleteWarning && styles.toggleThumbActive]} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
 }

 export default SettingsScreen