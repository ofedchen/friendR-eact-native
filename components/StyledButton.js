import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons"

export default function StyledButton({ primary, title, onPress, iconName }) {
    return (
    <Pressable style={iconName? { alignItems: "center" } : styles[primary ? "saveButton" : "secondary"]} onPress={onPress}>
        {iconName && <MaterialDesignIcons name={iconName} color="#0b0952ff" size={20} />}
        <Text>{title}</Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    saveButton: {
        marginVertical: 10,
        width: '100%',
        maxWidth: 320,
        borderRadius: 8,
        overflow: 'hidden',
    },
    secondary: {
        marginVertical: 10,
        width: '100%',
        maxWidth: 320,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: "#dcd9ddff"
    }
})