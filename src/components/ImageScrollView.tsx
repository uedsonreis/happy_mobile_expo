import React from 'react'
import { Dimensions, Image, View, ScrollView, StyleSheet } from 'react-native'

interface Props { sources: string[] }

export default function Component({ sources }: Props) {

    return (
        <View style={styles.imagesContainer}>
            <ScrollView horizontal pagingEnabled>
                { sources.map(source => (
                    <Image key={source} style={styles.image} source={{ uri: source }} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    imagesContainer: {
        height: 240,
    },
    image: {
        height: 240,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
    },
})