import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    Animated, 
    Image
} from "react-native"
import { styles } from "../lib/styles"
import { themeFunction } from "../lib/utils" // Import theme helper

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
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
        }).start(() => {
            setTimeout(onLoadingComplete, 100)
        })
    }, [onLoadingComplete, progress])

    const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200],
    })

    return (
        <View style={[
            styles.loadingContainer, 
            { backgroundColor: theme.background } 
        ]}>
            
            <Image 
                source={require('../assets/images/logo3.png')} 
                style={{ width: 100, height: 100, marginBottom: 20 }}
                resizeMode="contain"
            />

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