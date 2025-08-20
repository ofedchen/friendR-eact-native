import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from 'react-native';

export default function FriendScreen({ route }) {
    const navigation = useNavigation();
    const { itemId, friendName } = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>Your friend: {JSON.stringify(friendName)}</Text>
            <Button
                onPress={
                    () =>
                        navigation.push('Details', {
                            itemId: Math.floor(Math.random() * 100),
                        })
                }
                title="Go to Details... again"
            />
            <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
            <Button onPress={() => navigation.goBack()} title="Go back"/>
        </View>
    )
}