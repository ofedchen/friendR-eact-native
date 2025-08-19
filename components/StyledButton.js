import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons"

export default function StyledButton({ primary, title, onPress, iconName }) {
    return (
        <Pressable style={iconName ? { alignItems: "center" } : styles[primary ? "saveButton" : "secondary"]} onPress={onPress}>
            {iconName && <MaterialDesignIcons name={iconName} color="#0b0952ff" size={20} />}
            <Text style={styles[primary ? "buttonText" : "secondaryButtonText"]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    saveButton: {
        marginVertical: 10,
        backgroundColor: '#1A0966',  // Dark royal blue for primary button
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,  // For Android shadow effect
        shadowColor: '#000',  // For iOS shadow effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    secondary: {
        borderColor: '#1A0966',  // Royal blue border for secondary button
        borderWidth: 1,           // Thinner border for subtle look
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    secondaryButtonText: {
        color: '#1A0966',  // Royal blue text for secondary button
        fontSize: 18,
        fontWeight: 'bold',
    },
})