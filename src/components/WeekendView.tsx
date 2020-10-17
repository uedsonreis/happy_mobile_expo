import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface Props { isOpen: boolean }

export default function Component({ isOpen }: Props) {

    return isOpen ? (
        <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather name="info" size={40} color="#39CC83" />
            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos no fim de semana.</Text>
        </View>
    ) : (
        <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
            <Feather name="info" size={40} color="#FF669D" />
            <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos no fim de semana.</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    scheduleItem: {
        width: '48%',
        padding: 20,
    },
    scheduleText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
    },
    scheduleItemGreen: {
        backgroundColor: '#EDFFF6',
        borderWidth: 1,
        borderColor: '#A1E9C5',
        borderRadius: 20,
    },
    scheduleItemRed: {
        backgroundColor: '#FEF6F9',
        borderWidth: 1,
        borderColor: '#FFBCD4',
        borderRadius: 20,
    },
    scheduleTextGreen: {
        color: '#37C77F'
    },
    scheduleTextRed: {
        color: '#FF669D'
    },
})