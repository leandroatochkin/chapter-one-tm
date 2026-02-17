import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../lib/styles';
import { themeFunction } from '../lib/utils';
import { Screens } from '../lib/interfaces';

interface NavigationBarProps {
    isDarkMode: boolean
    currentScreen: Screens
    setCurrentScreen: (screen: Screens) => void
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
    isDarkMode,
    currentScreen,
    setCurrentScreen
}) => {

    const theme = themeFunction(isDarkMode)

    return (
        <View style={[styles.bottomNav, { backgroundColor: theme.cardBackground }]}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    currentScreen === 'main' && { borderTopColor: theme.accent },
                  ]}
                  onPress={() => setCurrentScreen('main')}
                >
                  <Text
                    style={[
                      styles.navButtonText,
                      { color: currentScreen === 'main' ? theme.accent : theme.text },
                    ]}
                  >
                    Tasks
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    currentScreen === 'archive' && { borderTopColor: theme.accent },
                  ]}
                  onPress={() => setCurrentScreen('archive')}
                >
                  <Text
                    style={[
                      styles.navButtonText,
                      { color: currentScreen === 'archive' ? theme.accent : theme.text },
                    ]}
                  >
                    Archive
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    currentScreen === 'settings' && { borderTopColor: theme.accent },
                  ]}
                  onPress={() => setCurrentScreen('settings')}
                >
                  <Text
                    style={[
                      styles.navButtonText,
                      { color: currentScreen === 'settings' ? theme.accent : theme.text },
                    ]}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>
        </View>
    )
}