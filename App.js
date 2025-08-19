import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import AddFriendPage from './screens/AddFriendPage';
import { PaperProvider } from 'react-native-paper';

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
  return (
    <PaperProvider>
      <Navigation />;
    </PaperProvider>
  )
}

