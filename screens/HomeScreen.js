/* 
    [] add StartScreen to imitate splash screen
    [] add Actions section - add your friends birthdays to calendar
    [] change background under slider
    [] make slider more explicit?
    [] change Alert to Toast 
*/

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import * as Calendar from 'expo-calendar';
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


    useEffect(() => {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const calendars = await Calendar.getCalendarsAsync(
                    Calendar.EntityTypes.EVENT
                );
                console.log('Here are all your calendars:');
                console.log({ calendars });
            }
        })();
    }, []);

    async function getDefaultCalendar() {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendar = calendars.find(
            (cal) => cal.isPrimary || cal.accessLevel >= Calendar.CalendarAccessLevel.MODIFY
        );

        if (!defaultCalendar) {
            Alert.alert('Error', 'Could not find a suitable calendar to add events to.');
            return;
        }

        return defaultCalendar;
    }


    const addBirthdays = async () => {
        try {
            const defaultCalendar = await getDefaultCalendar();
            console.log('Using calendar with ID:', defaultCalendar.id, 'and title:', defaultCalendar.title);
            const minutesInAWeek = 7 * 24 * 60; 

            for (let friend of friends) {
                const birthdayString = Date.now().getFullYear().toString() + friend.birthday.slice(4)
                const birthdayCurrentYear = new Date(birthdayString)
                await Calendar.createEventInCalendarAsync(defaultCalendar.id, {
                    startDate: birthdayCurrentYear,
                    endDate: birthdayCurrentYear,
                    allDay: true,
                    title: 'Happy Birthday to ' + friend.name,
                    recurrenceRule: {
                        frequency: Calendar.Frequency.YEARLY,
                        interval: 1,
                    },
                    alarms: [
                        {
                            relativeOffset: -minutesInAWeek,
                            method: Calendar.AlarmMethod.ALERT,
                        },
                        {
                            relativeOffset: 0,
                            method: Calendar.AlarmMethod.ALERT,
                        },
                    ],
                });
                console.log(`Event created for ${friend.name}`);
            }
            Alert.alert('All birthday events have been created!');
        } catch (e) {
            console.log(e);
        }
    };

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
            <StyledButton onPress={addBirthdays} title='Add birthdays to calendar' primary={false} />
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