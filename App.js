import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddFriendPage from './pages/AddFriendPage';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Friend database</Text>
      <Button onPress={() => navigation.navigate('AddFriendPage')} title='Add your friends' />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

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
  return <Navigation />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0966ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    marginBlock: 20
  }
});
