import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons"
import StyledButton from "../components/StyledButton";
import { useEffect, useState } from "react";

const SERVER_URL = 'http://192.168.1.134:3000/friends'; //home
// const SERVER_URL = 'http://192.168.1.57:3000/friends'; //school

export default function FriendScreen({ route }) {
    const navigation = useNavigation();
    const { itemId, friendName } = route.params;

    const [friendDetails, setFriendDetails] = useState('');
    // const [address, setAddress] = useState(null);
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(false);
    // const [image, setImage] = useState(null);
    // const [imageBase64, setImageBase64] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistItem, setWishlistItem] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(SERVER_URL)
            .then(response => response.json())
            .then(result => {
                const foundFriend = result.find(e => e.id === itemId);
                if (foundFriend && foundFriend.birthday) {
                    foundFriend.birthday = new Date(foundFriend.birthday);
                }
                setFriendDetails(foundFriend);
            })
    }, []);

    // add to wishlist
    const addWishlistItem = async () => {
        if (wishlistItem.trim()) {
            setWishlist([...wishlist, wishlistItem.trim()]);
            setWishlistItem('')
        }
    }
    if (!friendDetails) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1A0966" />
                <Text>Loading friend details...</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView} keyboardVerticalOffset={80}>
                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.h2}>Details about your friend {friendDetails.name}</Text>
                    <Image source={{ uri: `data:image/png;base64,${friendDetails.image}` }} style={styles.image} />
                    <Text accessibilityLabel="Label for Birthday" style={styles.h3}>Birthday</Text>
                    <Text style={styles.text}>{friendDetails.birthday ? (friendDetails.birthday).toLocaleDateString("en-GB") : ""}</Text>
                    <Text accessibilityLabel="Label for Address" style={styles.h3}>Address</Text>
                    <Text style={styles.text}>{friendDetails.address}</Text>
                    {/* <Pressable>Edit</Pressable>
            <TextInput />
            <StyledButton /> */}
                    <Text accessibilityLabel="Label for Wishlist items" style={styles.h3}>Wishlist</Text>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setWishlistItem}
                            value={wishlistItem}
                            placeholder="Kiehl's moisturizer"
                        // placeholderTextColor="#fff"
                        />
                    </TouchableWithoutFeedback>
                    <StyledButton title="Add to wishlist" onPress={addWishlistItem} primary={false} />
                    {wishlist && wishlist.map(item => (<View key={item} style={styles.wishlist}><Text style={{ padding: 4 }}>{item}</Text><MaterialDesignIcons name="delete-outline" color="#0b0952ff" size={18} style={{ padding: 4 }} onPress={() => { setWishlist(wishlist.filter(i => i !== item)) }} /></View>))}
                    {/* {loading ? (
                <ActivityIndicator size="large" color="#D3D3D3" style={{ margin: 10 }} />
            ) : (
                <StyledButton primary={true} title="Save friend" onPress={saveFriend} />
            )} */}

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginLeft: 10,
        // backgroundColor: '#f5f6fa',
    },
    keyboardAvoidingView: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 12,
        marginVertical: 16,
        // backgroundColor: '#e1e1e1',
    },
    form: {
        alignItems: 'center',
        padding: 24,
        paddingBottom: 40
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
        marginVertical: 8,

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
})