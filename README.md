# Task Manager App - React Native

A comprehensive Task Manager application built with React Native and Expo, featuring task management, archiving, reminders, and customizable settings.

## Features

### Core Features 
-  **Add Tasks**: Create new tasks with title and description
-  **Mark as Complete**: Mark tasks as completed and archive them
-  **Delete Tasks**: Delete tasks from archive permanently
-  **Task List**: View all active tasks in a scrollable list
-  **User Interface**: Clean, intuitive UI with visual feedback
-  **State Management**: Local component state with AsyncStorage persistence

### Enhanced Features
- **Task Archive**: View all completed and deleted tasks
- **Restore Tasks**: Bring archived tasks back to the main list
- **Reminders**: Set reminders (15min, 30min, 1h, 6h, 12h, 24h) (only on mobile)
- **Form Validation**: All fields required before submission
- **Theme Support**: Light and Dark mode
- **Responsive Design**: Works on all screen sizes
- **Feedback**: Visual and haptic feedback to actions
- **Task Details**: Tap to view/edit task information
- **Data Persistence**: All data saved to device storage

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (will be installed with dependencies)

### Step 1: Clone repo

```bash
git clone https://github.com/leandroatochkin/chapter-one-tm
```

### Step 2: Install Dependencies

```bash
cd chapter-one-tm
npm install or yarn install
```

### Step 3: Start the Development Server

```bash
npx expo start
```

### Step 4: Run on Device/Emulator

#### iOS (Mac only)
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Web
```bash
npm run web
```

#### Using Expo Go App
1. Install Expo Go on your iOS/Android device
2. Scan the QR code shown in the terminal
3. The app will load on your device

## Usage Guide

### Adding a Task
1. Tap the floating **+** button (orange circle with plus icon)
2. Enter a task title (required)
3. Enter a task description (required)
4. Optionally set a deadline for the task
4. Optionally set a reminder time (if in mobile)
5. Tap **Add Task**

### Viewing Tasks
- All active tasks appear on the main screen
- Scroll through the list to see all tasks
- Tasks with reminders show a clock icon
- Tap any task card to view full details and edit if desired

### Completing a Task
- **Quick complete**: Tap the checkmark button on the task card
- **From details**: Tap the task card, then tap **Complete** button
- Completed tasks move to the Archive

### Deleting a Task
- **Quick delete**: Tap the trash icon on the task card
- **From details**: Tap the task card, then tap **Delete** button
- Deleted tasks move to the Archive

### Archive Screen
- Access via bottom navigation (Archive)
- View all completed and deleted tasks
- **Restore**: Bring task back to main list
- **Remove**: Permanently delete from archive
- Status badges show if task was completed or deleted

### Settings
- Access via bottom navigation (Settings)
- **Dark Mode**: Toggle between light and dark themes
- **Delete confirmation**: Choose if you want to see a warning before deleting a task

## Technical Details

### Dependencies
- **react**: 19.1.0
- **react-native**: 0.81.5
- **expo**: ~54.0.33
- **@react-native-async-storage/async-storage**: For data persistence
- **@expo/vector-icons**: For icons (Ionicons)
- **react-native-root-siblings**: For injecting toast notifications in the top of the visual hierarchy
- **react-native-root-toast**: For toast notifications
- **react-native-safe-area-context**: Replacement for deprecated safe-area
- **expo-haptics**: For haptics
- **@react-native-community/datetimepicker**: For date picking

### State Management
- Uses React hooks (useState, useEffect)
- Local component state for UI
- AsyncStorage for persistent data storage



**Note**: This app uses local storage only. All data is stored on the device and not synced to any cloud service.

**Environment Note**: This is a Sandbox version of the Task Manager. While reminders are functional within the app, system-wide notifications are disabled in the Preview environment. For full background alerts, a native production build is required.