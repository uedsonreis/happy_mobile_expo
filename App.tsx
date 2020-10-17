import React from 'react'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'

import Routes from './src/router'
import { Text } from 'react-native'

export default function App() {

    const [fontsLoaded] = useFonts({
        Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold
    })

    if (!fontsLoaded) return <Text>Loading...</Text>

    return (
        <>
            <StatusBar style="dark" />
            <Routes />
        </>
    )
}