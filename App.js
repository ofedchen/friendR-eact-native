import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen'
import AddFriendPage from './screens/AddFriendPage';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    AddFriendPage: {
      screen: AddFriendPage,
      options: {
        title: 'Add your friend'
      }
    }

  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <PaperProvider theme={paperTheme}>
      <Navigation />;
    </PaperProvider>
  )
}

