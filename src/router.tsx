import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from './components/Header'
import MapPage from './pages/OrphanageMap'
import DetailsPage from './pages/OrphanageDetails'
import OrphanageData from './pages/create/OrphanageData'
import SelectMapPosition from './pages/create/SelectMapPosition'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator headerMode="screen" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen name="map" component={MapPage} />
                
                <Screen name="details" component={DetailsPage} options={{
                    headerShown: true, header: () => <Header title="Details" />
                }} />
                
                <Screen name="create/position" component={SelectMapPosition} options={{
                    headerShown: true, header: () => <Header title="Informe a Localização" />
                }} />
                
                <Screen name="create/data" component={OrphanageData} options={{
                    headerShown: true, header: () => <Header title="Data" close />
                }} />
            </Navigator>
        </NavigationContainer>
    )
}