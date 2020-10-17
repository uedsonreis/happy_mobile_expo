import React from 'react'
import { Marker } from 'react-native-maps'

import Callout from '../components/Callout'
import markerImg from '../../assets/markers/marker.png'

interface Props {
    latitude: number, longitude: number,
    onPress?: () => void
    text?: string,
}

export default function Component({ latitude, longitude, text, onPress }: Props) {

    return(
        <Marker icon={markerImg} coordinate={{ latitude, longitude }} calloutAnchor={{ x: 2.7, y: 0.8 }}>
            { text && <Callout text={text} onPress={onPress} /> }
        </Marker>
    )

}