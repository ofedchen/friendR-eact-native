import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Alert, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons"
import StyledButton from "../components/StyledButton";
import { useEffect, useState } from "react";

const SERVER_URL = "http://192.168.1.134:3000/friends"; //home
// const SERVER_URL = "http://192.168.1.57:3000/friends"; //school

export default function FriendScreen({ route }) {
    const navigation = useNavigation();
    const { itemId, friendName } = route.params;

    const [friendDetails, setFriendDetails] = useState(null);
    const [wishlistItem, setWishlistItem] = useState(null);

    useEffect(() => {
        fetch(SERVER_URL)
            .then(response => response.json())
            .then(result => {
                const foundFriend = result.find(f => f.id === itemId);
                if (foundFriend && foundFriend.birthday) {
                    foundFriend.birthday = new Date(foundFriend.birthday);
                    setFriendDetails(foundFriend);
                }
            })
    }, []);

    // add to and delete from wishlist

    const updateWishList = async (updatedWishList) => {
        try {
            const response = await fetch(`${SERVER_URL}/${itemId}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ wishlist: updatedWishList, })
            })

            if (response.ok) {
                setFriendDetails({ ...friendDetails, wishlist: updatedWishList });
                setWishlistItem("")
                if (Platform.OS === "android")
                    ToastAndroid.show("Wishlist updated!", ToastAndroid.SHORT);
                else
                    Alert.alert("Success", "Wishlist updated!");
            } else {
                if (Platform.OS === "android")
                    ToastAndroid.show("Failed to update wishlist", ToastAndroid.SHORT);
                else
                    Alert.alert("Failed to update wishlist");
            }

        } catch (error) {
            if (Platform.OS === "android")
                ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
            else
                Alert.alert("Error: ", error.message);
        }
    }

    const addWishlistItem = async () => {
        if (!wishlistItem || wishlistItem.trim() === "") {
            if (Platform.OS === "android")
                ToastAndroid.show("Please enter a wishlist item", ToastAndroid.SHORT);
            else
                Alert.alert("Please enter a wishlist item");
            return
        }

        const updWishList = [...friendDetails.wishlist, wishlistItem.trim()]
        await updateWishList(updWishList)
    }

    const deleteFromWishlist = async (itemToDelete) => {
        const updWishList = friendDetails.wishlist.filter(item => item !== itemToDelete)
        await updateWishList(updWishList)
    }

    if (!friendDetails) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1A0966" />
                <Text style={{ textAlign: "center", padding: 30, fontWeight: "700" }}>Loading friend details...</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView} keyboardVerticalOffset={80}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.h2}>Details about your friend {friendDetails.name}</Text>
                    <Image source={{ uri: `data:image/png;base64,${friendDetails.image}` }} style={styles.image} />
                    <Text accessibilityLabel="Label for Birthday" style={styles.h3}>Birthday</Text>
                    <View style={styles.birthday}>
                        <Text style={styles.text}>{friendDetails.birthday ? (friendDetails.birthday).toLocaleDateString("en-GB") : ""}</Text>
                        <Text style={{marginVertical: 8, color: friendDetails.reminderSet ? "green" : "darkgrey"}}>{friendDetails.reminderSet ? "Added to Calendar" : "Reminder not set"}</Text>
                    </View>
                    <Text accessibilityLabel="Label for Address" style={styles.h3}>Address</Text>
                    <Text style={styles.text}>{friendDetails.address}</Text>
                    <Text accessibilityLabel="Label for Wishlist items" style={styles.h3}>Wishlist</Text>
                    {friendDetails.wishlist && friendDetails.wishlist.map(item => (<View key={item} style={styles.wishlist}><Text style={{ padding: 4 }}>{item}</Text><MaterialDesignIcons name="delete-outline" color="#0b0952ff" size={18} style={{ padding: 4 }} onPress={() => deleteFromWishlist(item)} /></View>))}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setWishlistItem}
                            value={wishlistItem}
                            placeholder="Kiehl's moisturizer"
                        />
                    </TouchableWithoutFeedback>
                    <StyledButton title="Add to wishlist" onPress={addWishlistItem} primary={false} />
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
    },
    keyboardAvoidingView: {
        paddingVertical: 10
    },
    scrollView: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 50,
    },
    h2: {
        fontSize: 24,
        fontWeight: "bold",
        paddingVertical: 10,
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 12,
        marginVertical: 16,
    },
    form: {
        alignItems: "center",
        padding: 24,
        paddingBottom: 40
    },
    h3: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 18,
        marginBottom: 6,
        alignSelf: "flex-start",
    },
    input: {
        height: 44,
        width: "100%",
        maxWidth: 320,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#B0BEC5",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
    },
    text: {
        marginVertical: 8,
        alignSelf: "flex-start",
    },
    birthday: {
        width: 240, 
        alignSelf: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    wishlist: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "space-between",
        fontSize: 18,
        padding: 6,
        borderRadius: 6,
        marginVertical: 4,
        alignSelf: "flex-start",
        width: "100%",
        maxWidth: 360,
    }
})