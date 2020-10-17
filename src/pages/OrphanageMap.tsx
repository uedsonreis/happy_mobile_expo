import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { Orphanage } from '../entities'
import Marker from '../components/Marker'

import api from '../services/api'

export default function Map() {

    const [orphanages, setOrphanages] = useState(new Array<Orphanage>())

    useEffect(() => {
        api.getOrphanages().then(data => setOrphanages(data))
    }, [])

    const navigation = useNavigation()

    function goToDetails(orphanage: Orphanage): void {
        navigation.navigate('details', { orphanage })
    }

    function handleCreate(): void {
        navigation.navigate('create/position')
    }

    const delta = 0.008
    const latitude = -12.9859584
    const longitude = -38.4471368

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude, longitude,
                    latitudeDelta: delta,
                    longitudeDelta: delta
                }}
            >
                { orphanages.map(orphanage => (
                    <Marker key={orphanage.id}
                        text={orphanage.name} onPress={() => goToDetails(orphanage)}
                        latitude={orphanage.latitude} longitude={orphanage.longitude}
                    />
                )) }
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados`}</Text>
                <TouchableOpacity onPress={handleCreate} style={styles.button}>
                    <Feather name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    footer: {
        left: 24,
        right: 24,
        bottom: 32,
        height: 56,
        elevation: 3,
        paddingLeft: 24,
        borderRadius: 20,
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
    },
    footerText: {
        color: '#8FA7B3',
        fontFamily: 'Nunito_700Bold',
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15C3D6',
    },
})