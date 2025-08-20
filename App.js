import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen'
import AddFriendPage from './screens/AddFriendPage';
import FriendScreen from './screens/FriendScreen';
import * as SplashScreen from 'expo-splash-screen';

// splashscreen
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// SplashScreen.preventAutoHideAsync();

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddFriendPage: {
      screen: AddFriendPage,
      options: {
        title: 'Add your friend'
      }
    },
    FriendScreen: {
      screen: FriendScreen,
      options: ({ route }) => ({
        title: `${route.params?.friendName}'s page` || 'Friend Details'
      })
    }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {

  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  )
}

