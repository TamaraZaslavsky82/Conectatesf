import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Linking, ImageBackground } from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps'; // Importa Marker
import SquareButton from './SquareButton';
import dataMuni from './dataMuni.json';

const customStyle = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];


const MunicipalityInfo = ({ info }) => (
    <ImageBackground source={require('./montaña.jpg')} style={styles.container}>
        <ScrollView>
            <Image source={require('./muni.jpg')} style={styles.image} />
            <Text style={styles.title}>La Municipalidad de San Francisco del Monte de Oro, cuenta con diversas areas</Text>
            <Text style={styles.title}>Nuestros horarios de atencion son de Lunes a Viernes de 7 a 13hs.</Text>
           <View style={styles.buttonContainer}>
    <Button 
        title="Llamar" 
        onPress={() => Linking.openURL('tel:02651 42-6119')}
    />
</View>
<View style={styles.buttonContainer}>
    <Button 
        title="Enviar correo" 
        onPress={() => Linking.openURL('mailto:Intendencia@munisanfrancisco.ar')} 
    />
</View>
<View style={styles.buttonContainer}>
    <Button 
        title="Visitar Instagram" 
        onPress={() => Linking.openURL('https://www.instagram.com/munisanfranciscodelmontedeoro/')} 
    />
</View>
            <Text style={styles.info}>{info}</Text>
            <View style={styles.buttonsContainer}>
                {dataMuni.areas.map((area) => (
                    <SquareButton key={area.id} area={area.name} onPress={() => console.log(`Pressed ${area.name}`)} />
                ))}
            </View>
     
        <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} // Asegúrate de usar el proveedor de Google
            customMapStyle={customStyle} // Aplica el estilo personalizado
            initialRegion={{
                latitude: -32.601165,
                longitude: -66.128000,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            >
            <Marker
                coordinate={{
                    latitude: -32.601165,
                    longitude: -66.128000,
                }}
                title={"San Francisco del Monte de Oro"}
                description={"Municipalidad de San Francisco del Monte de Oro"}
                />
        </MapView>
                </ScrollView>
                </ImageBackground>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    map: {
        height: 200, // Define a height for the map
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
marginTop: 10,   },
buttonContainer: {
    marginBottom: 10, // o el espacio que desees
},
});

export default MunicipalityInfo;