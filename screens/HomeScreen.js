import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import StyledButton from '../components/StyledButton';

const SERVER_URL = 'http://192.168.1.134:3000/friends'; //home
// const SERVER_URL = 'http://192.168.1.57:3000/friends'; //school

export default function HomeScreen() {
    const navigation = useNavigation();
    const [friends, setFriends] = useState([]);


    useEffect(() => {
        fetch(SERVER_URL)
            .then(response => response.json())
            .then(result => {
                setFriends(result)
            })
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.headerContainer}>
                <Text style={styles.h1}>Friend</Text>
                <FontAwesomeIcon icon={faShip} size={32} color="#f8f8f8" style={styles.icon} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.h2}>{friends.length > 0 ? 'Your added friends:' : "You haven't added any friends yet!"}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.friendsListContainer}>
                    {friends.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.friendCard} onPress={() => navigation.navigate('FriendScreen', {
                            itemId: item.id,
                            friendName: item.name,
                        })}>
                            <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.image}></Image>
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <StyledButton onPress={() => navigation.navigate('AddFriendPage')} title='Add your friends' primary={true} />
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: 25,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25,
        backgroundColor: '#1A0966',
    },
    h1: {
        color: '#f8f8f8',
        fontSize: 32,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingVertical: 20,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 25,
        paddingVertical: 20,
    },
    friendsListContainer: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        alignItems: 'center',
        paddingTop: 25,
    },
    friendCard: {
        width: 180,
        height: 220,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    buttonContainer: {
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
});