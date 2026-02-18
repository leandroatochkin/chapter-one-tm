export const reminderOptions = [
    { label: '15 mins', value: 15 },
    { label: '30 mins', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '6 hours', value: 360 },
    { label: '12 hours', value: 720 },
    { label: '24 hours', value: 1440 },
  ];

export const themeFunction = (isDarkMode: boolean) => {
    return {
        background: isDarkMode ? '#182327' : '#FFFFFF',
        text: isDarkMode ? '#FFFFFF' : '#000000',
        cardBackground: isDarkMode ? '#263238' : '#F5F5F5',
        accent: '#ff5222',
        border: isDarkMode ? '#37474F' : '#E0E0E0',
    }
  }

