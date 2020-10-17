import React from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import ImageScrollView from '../components/ImageScrollView'
import WeekendView from '../components/WeekendView'
import Marker from '../components/Marker'
import { Orphanage } from '../entities';

const URL_MAPS = 'https://www.google.com/maps/dir/?api=1&destination'

export default function OrphanageDetails() {
    const route = useRoute()
    const delta = 0.008
    
    const { orphanage } = route.params as { orphanage: Orphanage }

    function handleOpenMapRoutes() {
        Linking.openURL(`${URL_MAPS}=${orphanage.latitude},${orphanage.longitude}`)
    }

    return (
        <ScrollView style={styles.container}>
            <ImageScrollView sources={orphanage.photos.map(photo => photo.path)} />

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{orphanage.name}</Text>
                <Text style={styles.description}>{orphanage.about}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                            latitudeDelta: delta, longitudeDelta: delta,
                        }}
                        zoomEnabled={false} pitchEnabled={false} scrollEnabled={false}
                        rotateEnabled={false} style={styles.mapStyle}
                        provider={PROVIDER_GOOGLE}
                    >
                        <Marker latitude={orphanage.latitude} longitude={orphanage.longitude} />
                    </MapView>

                    <TouchableOpacity onPress={handleOpenMapRoutes} style={styles.routesContainer}>
                        <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                <Text style={styles.description}>{orphanage.instructions}</Text>

                <View style={styles.scheduleContainer}>
                    <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{`Segunda à Sexta: ${orphanage.visitHour}`}</Text>
                    </View>
                    <WeekendView isOpen={orphanage.weekend} />
                </View>

                <RectButton style={styles.contactButton} onPress={() => { }}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>{`Contato: ${orphanage.whatsapp}`}</Text>
                </RectButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    detailsContainer: {
        padding: 24,
    },

    title: {
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 16,
    },

    mapContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#B3DAE2',
        marginTop: 40,
        backgroundColor: '#E6F7FB',
    },

    mapStyle: {
        width: '100%',
        height: 150,
    },

    routesContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    routesText: {
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5'
    },

    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#D3E2E6',
        marginVertical: 40,
    },

    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    scheduleItem: {
        width: '48%',
        padding: 20,
    },

    scheduleItemBlue: {
        backgroundColor: '#E6F7FB',
        borderWidth: 1,
        borderColor: '#B3DAE2',
        borderRadius: 20,
    },

    scheduleText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
    },

    scheduleTextBlue: {
        color: '#5C8599'
    },

    contactButton: {
        backgroundColor: '#3CDC8C',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40,
    },

    contactButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    }
})