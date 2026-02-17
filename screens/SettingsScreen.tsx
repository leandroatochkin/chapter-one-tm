import { 
    View,
    Text,
    TouchableOpacity,
    ViewStyle
} from "react-native";
import { 
    themeFunction
 } from "../lib/utils";
import { 
    styles
 } from "../lib/styles";
 import { 
    Alignment
 } from "../lib/interfaces";


 interface SettingScreenProps {
    isDarkMode: boolean,
    setIsDarkMode: (mode: boolean) => void
    getAlignmentStyle: () => ViewStyle
    setButtonAlignment: (align: Alignment) => void
    buttonAlignment: string
 }

const SettingsScreen: React.FC<SettingScreenProps> = ({
    isDarkMode,
    setIsDarkMode,
    getAlignmentStyle,
    setButtonAlignment,
    buttonAlignment
 }) => {

    const theme = themeFunction(isDarkMode)

    return(
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.header, { color: theme.text }]}>Settings</Text>
            <View style={styles.settingsContent}>
                {/* Dark Mode Toggle */}
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
        
                {/* Button Alignment */}
                <View style={styles.settingItem}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                    Button Alignment
                </Text>
                </View>
                <View style={[styles.alignmentButtons, getAlignmentStyle()]}>
                {(['left', 'center', 'right'] as const).map((align) => (
                    <TouchableOpacity
                    key={align}
                    style={[
                        styles.alignmentButton,
                        buttonAlignment === align && {
                        backgroundColor: theme.accent,
                        },
                        { borderColor: theme.border },
                    ]}
                    onPress={() => setButtonAlignment(align)}
                    >
                    <Text
                        style={[
                        styles.alignmentButtonText,
                        { color: buttonAlignment === align ? '#FFF' : theme.text },
                        ]}
                    >
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>
        </View>
    )
 }

 export default SettingsScreen