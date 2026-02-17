import Toast from 'react-native-root-toast'

export const showToast = (message: string, isDarkMode: boolean) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: isDarkMode ? '#333' : '#FFF',
    textColor: isDarkMode ? '#FFF' : '#000',
  });
};