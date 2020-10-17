import React, { useState } from 'react';
import MapView, { MapEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import Marker from '../../components/Marker'

export default function SelectMapPosition() {
    const navigation = useNavigation();

    const [ position, setPosition ] = useState<{ latitude: number, longitude: number }>()

    function handlePressMap(event: MapEvent) {
        setPosition({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        })
    }

    function handleNextStep() {
        navigation.navigate('create/data', position);
    }

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: -27.2092052,
                    longitude: -49.6401092,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
                provider={PROVIDER_GOOGLE}
                onPress={handlePressMap}
                style={styles.mapStyle}
            >
                { (position) && (
                    <Marker latitude={position.latitude} longitude={position.longitude} />
                )}
            </MapView>

            { (position) && (
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                </RectButton>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    }
})