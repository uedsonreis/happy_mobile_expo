import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BorderlessButton } from 'react-native-gesture-handler'

interface Props { title: string, close?: boolean }

export default function Header({ title, close = false }: Props) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>

            <BorderlessButton onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color="#15B6D6" />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            { !close ? <View /> : (
                <BorderlessButton onPress={() => navigation.navigate('map')}>
                    <Feather name="x" size={24} color="#ff669d" />
                </BorderlessButton>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 44,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#dde3f8',
        backgroundColor: '#f9fafc',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        color: '#8FA7B3',
        fontFamily: 'Nunito_600SemiBold',
    }
})