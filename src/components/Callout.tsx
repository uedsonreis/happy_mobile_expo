import React from 'react'
import { Callout } from 'react-native-maps'
import { Text, View, StyleSheet } from 'react-native'

interface Props {
    text: string,
    onPress?: () => void
}

export default function Component({ text, ...rest }: Props) {
    return (
        <Callout tooltip {...rest}>
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </Callout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 46,
        borderRadius: 16,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },

    text: {
        fontSize: 14,
        color: '#0089A5',
        fontFamily: 'Nunito_700Bold',
    },
})