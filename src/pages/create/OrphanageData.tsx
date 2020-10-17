import React, { useState } from 'react'
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as EIP from 'expo-image-picker'

import { Orphanage, Photo } from '../../entities'
import api from '../../services/api'

export default function OrphanageData() {
    const navigation = useNavigation()
    const route = useRoute()

    const { latitude, longitude } = route.params as { latitude: number, longitude: number }

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [weekend, setWeekend] = useState(false)
    const [visitHour, setVisitHour] = useState('')
    const [instructions, setInstructions] = useState('')
    const [photos, setPhotos] = useState<string[]>([])

    async function handlePhotoPicker() {
        const { granted } = await EIP.requestCameraRollPermissionsAsync()
        if (granted) {
            const { uri, cancelled }: any = await EIP.launchImageLibraryAsync({
                allowsEditing: true, quality: 1, mediaTypes: EIP.MediaTypeOptions.Images
            })
            if (cancelled) return

            setPhotos([ ...photos, uri ])

        } else {
            alert('Ok, mas sem acesso o Orfanato será cadastrado sem fotos.')
        }
    }

    async function handleCreate() {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('about', about)
        formData.append('visitHour', visitHour)
        formData.append('instructions', instructions)
        
        formData.append('weekend', String(weekend))
        formData.append('latitude', String(latitude))
        formData.append('longitude', String(longitude))
        formData.append('whatsapp', whatsapp)
        
        photos.forEach((photo, index) => {
            formData.append('photos', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: photo,
            } as any)
        })

        const orphanage = await api.createOrphanage(formData)
        console.log('Orph: ', orphanage)
        navigation.navigate('map')
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Sobre</Text>
            <TextInput
                style={[styles.input, { height: 110 }]} multiline
                value={about} onChangeText={setAbout}
            />

            <Text style={styles.label}>Whatsapp</Text>
            <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} />

            <Text style={styles.label}>Fotos</Text>

            <View style={styles.uploadedContainer}>
                { photos.map(photo => (
                    <Image key={photo} source={{ uri: photo }} style={styles.uploadedPhoto} />
                )) }
            </View>

            <TouchableOpacity style={styles.imagesInput} onPress={handlePhotoPicker}>
                <Feather name="plus" size={24} color="#15B6D6" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>

            <Text style={styles.label}>Instruções</Text>
            <TextInput
                style={[styles.input, { height: 110 }]} multiline
                value={instructions} onChangeText={setInstructions}
            />

            <Text style={styles.label}>Horario de visitas</Text>
            <TextInput style={styles.input} value={visitHour} onChangeText={setVisitHour} />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch
                    thumbColor="#fff" trackColor={{ false: '#ccc', true: '#39CC83' }}
                    value={weekend} onValueChange={setWeekend}
                />
            </View>

            <RectButton style={styles.nextButton} onPress={handleCreate}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        color: '#5c8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6'
    },

    label: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: '#8fa7b3',
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#96D2F0',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },

    uploadedContainer: {
        flexDirection: 'row',
    },

    uploadedPhoto: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 32,
        marginRight: 8
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    }
})