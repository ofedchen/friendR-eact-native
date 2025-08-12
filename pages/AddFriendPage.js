import { useState } from "react";
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

export default function AddFriendPage() {

    const [friendName, setFriendName] = useState(null);
    const [address, setAddress] = useState(null);
    const [date, setDate] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <SafeAreaView style={styles.container}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title={image ? "Change image" : "Pick an image from camera roll"} onPress={pickImage} />
            <Text accessibilityLabel="Label for Friend Name" style={styles.h3}>Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFriendName}
                value={friendName}
            />
            <Text accessibilityLabel="Label for Address" style={styles.h3}>Address</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAddress}
                value={address}
                placeholder="fill in address"
                placeholderTextColor="#fff"
            // keyboardType="numeric"
            />
            <Text accessibilityLabel="Label for Birthday" style={styles.h3}>Birthday</Text>
            {date && <Text style={styles.text}>selected: {date ? date.toLocaleDateString("en-GB") : ""}</Text>}
            <Button onPress={showDatepicker} title={date ? "Change" : "Show date picker!"} />

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a0966ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 2,
        borderWidth: 1,
        borderColor: "white",
        padding: 10,
        color: "white",
    },

    text: {
        color: "#fff",
        marginBlock: 5
    },
    h3: {
        color: "#fff",
        fontSize: 20,
        marginBlock: 8
    },
    image: {
        width: 200,
        height: 200,
        marginBlock: 15
    },
});