import React, { useEffect, useState } from "react";
import {
    Animated,
    Text,
    View
} from "react-native";
import { styles } from "../lib/styles";
import { themeFunction } from "../lib/utils";

interface LoadingScreenProps {
    onLoadingComplete: () => void
    isDarkMode: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    onLoadingComplete,
    isDarkMode
}) => {
    const theme = themeFunction(isDarkMode)
    const [progress] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.delay(500)
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(onLoadingComplete, 100)
        })
    }, [])

    const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200],
    })

    return (
        <View style={[
            styles.loadingContainer, 
            { backgroundColor: theme.background } 
        ]}>
            
            <Text style={[styles.loadingTitle, { color: theme.text }]}>
                Task Manager
            </Text>

            <View style={[styles.loadingBarContainer, { backgroundColor: theme.border }]}>
                <Animated.View
                    style={[
                        styles.loadingBar,
                        {
                            backgroundColor: theme.accent, 
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
        </View>
    );
}

export default LoadingScreen