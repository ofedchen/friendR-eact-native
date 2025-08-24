/*
[x] check how to save picture to json - as uri and use as source
[x] change buttons to Pressable and style them and make into components
[x] navigate to homescreen after saving
[] move wishlist to friend page?
[] add required to input
[] check the labels
*/

import { useState } from "react";
import { ActivityIndicator, Alert, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons"
import StyledButton from "../components/StyledButton";

// const SERVER_URL = 'http://192.168.1.134:3000/friends'; //home
const SERVER_URL = 'http://192.168.1.57:3000/friends'; //school


export default function AddFriendPage() {

    const navigation = useNavigation();

    const [friendName, setFriendName] = useState(null);
    const [address, setAddress] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistItem, setWishlistItem] = useState(null);
    const [loading, setLoading] = useState(false)

    // image picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageBase64(result.assets[0].base64);
        }
    };

    // add to wishlist
    const addWishlistItem = async () => {
        if (wishlistItem.trim()) {
            setWishlist([...wishlist, wishlistItem.trim()]);
            setWishlistItem('')
        }
    }

    // DatePicker for choosing birthday
    const onChange = (event, selectedDate) => {
        setShow(false);
        setBirthday(selectedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    //saving to db
    const saveFriend = async () => {
        if (!friendName || !address || !birthday) {
            Alert.alert("Please fill all fields and pick an image.");
            return;
        }

        setLoading(true);

        const friendData = {
            name: friendName,
            address,
            birthday: birthday.toISOString(),
            wishlist,
            image: imageBase64
        }

        try {
            const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(friendData)
            })

            if (response.ok) {
                Alert.alert("Friend saved!");
                setFriendName(null);
                setAddress(null);
                setBirthday(null);
                setImage(null);
                setImageBase64(null);
                setWishlist([])
            } else {
                Alert.alert("Failed to save friend.");
            }

        } catch (error) {
            Alert.alert("Error: ", error.message);
        } finally {
            setLoading(false);
            navigation.navigate('Home')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView} keyboardVerticalOffset={80}>
                <ScrollView contentContainerStyle={styles.form}>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <StyledButton iconName="camera" title={image ? "Change image" : "Pick an image from camera roll"} onPress={pickImage} primary={false} />
                    <Text accessibilityLabel="Label for Friend Name" style={styles.h3}>Name</Text>
                    <TextInput
                        label="Name"
                        style={styles.input}
                        onChangeText={setFriendName}
                        value={friendName}
                        placeholder="Anna"
                    />
                    <Text accessibilityLabel="Label for Address" style={styles.h3}>Address</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder="Spain, Alicante, Calle Dr Sapena 4"
                    // placeholderTextColor="#fff"
                    />
                    <Text accessibilityLabel="Label for Birthday" style={styles.h3}>Birthday</Text>
                    {birthday && <Text style={styles.text}>selected: {birthday ? birthday.toLocaleDateString("en-GB") : ""}</Text>}
                    <StyledButton iconName="calendar-month" onPress={showDatepicker} title={birthday ? "Change date" : "Show date picker"} primary={false} />

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={birthday || new Date()}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                    {/* <Text accessibilityLabel="Label for Wishlist items" style={styles.h3}>Wishlist</Text>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setWishlistItem}
                            value={wishlistItem}
                            placeholder="Kiehl's moisturizer"
                        // placeholderTextColor="#fff"
                        />
                    </TouchableWithoutFeedback> */}
                   {/* <StyledButton title="Add to wishlist" onPress={addWishlistItem} primary={false} /> */}
                    {/* {wishlist && wishlist.map(item => (<View key={item} style={styles.wishlist}><Text style={{padding: 4}}>{item}</Text><MaterialDesignIcons name="delete-outline" color="#0b0952ff" size={18} style={{ padding: 4 }} onPress={() => { setWishlist(wishlist.filter(i => i !== item)) }} /></View>))} */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#D3D3D3" style={{ margin: 10 }} />
                    ) : (
                        <StyledButton primary={true} title="Save friend" onPress={saveFriend} />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f5f6fa',
    },
    keyboardAvoidingView: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
    },
    form: {
        alignItems: 'center',
        padding: 24,
        paddingBottom: 40
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 12,
        marginVertical: 16,
        // backgroundColor: '#e1e1e1',
    },
    h3: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 18,
        marginBottom: 6,
        alignSelf: 'flex-start',
    },
    input: {
        height: 44,
        width: '100%',
        maxWidth: 320,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        fontSize: 16,
    },
    text: {
        // color: "#444",
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    wishlist: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'space-between',
        fontSize: 18,
        padding: 6,
        borderRadius: 6,
        marginVertical: 4,
        alignSelf: 'flex-start',
        width: '100%',
        maxWidth: 360,
    }
});