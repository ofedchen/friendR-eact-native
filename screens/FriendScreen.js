import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from "react";

const SERVER_URL = 'http://192.168.1.134:3000/friends'; //home
// const SERVER_URL = 'http://192.168.1.57:3000/friends'; //school

export default function FriendScreen({ route }) {
    const navigation = useNavigation();
    const { itemId, friendName } = route.params;

    const [friendDetails, setFriendDetails] = useState('')

    useEffect(() => {
        fetch(SERVER_URL)
            .then(response => response.json())
            .then(result => {
                setFriendDetails(result.find(e => e.id === itemId))
            })
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.h2}>Details about your friend {friendDetails.name}</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>Your friend: {JSON.stringify(friendName)}</Text>
            <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
            <Button onPress={() => navigation.goBack()} title="Go back" />
        </View>
    )
}

const styles = StyleSheet.create({
        h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 25,
        paddingVertical: 20,
    },
})