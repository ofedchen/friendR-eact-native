import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// const SERVER_URL = 'http://192.168.1.134:3000/friends'; //home
const SERVER_URL = 'http://192.168.1.57:3000/friends'; //school

export default function HomeScreen() {
    const navigation = useNavigation();
    const [friends, setFriends] = useState([]);


    useEffect(() => {
        fetch(SERVER_URL)
            .then(response => response.json())
            .then(result => {
                console.log(result[0].id, result[0].name)
                setFriends(result)
            })
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.h1}>Friend database</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{maxHeight: 280, paddingTop: 10, paddingBottom: 30, marginBottom: 30}}>
                {friends.map((item) => (
                    <View key={item.id} style={styles.friendCard}>
                        <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.image}></Image>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
            <Button onPress={() => navigation.navigate('AddFriendPage')} title='Add your friends' />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a0966ff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    h1: {
        color: '#fff',
        fontSize: 40,
        marginBlock: 20
    },
    friendCard: {
        marginHorizontal: 12,
        alignItems: 'center'
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 12,
        marginVertical: 16,
        backgroundColor: '#e1e1e1',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 600
    }
});