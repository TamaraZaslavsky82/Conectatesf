import React from 'react';
import { Text, Modal, View, Button, ImageBackground, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import data from './datawifi.json'; 


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


class GeoMapaWifi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: { latitude: -32.5999, longitude: -66.1259 },
            zoom: 13,
            selectedTitle: null,
            modalVisible: false,
            route: null,
            origin: null,
            destination: null,
        };
    }

    componentDidMount() {
        Geolocation.getCurrentPosition((position) => {
            this.setState({ origin: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
        }, (error) => console.error(error), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    renderAnnotations() {
        return data.map(item => {
            if (item.location && item.location.latitude && item.location.longitude) {
                return (
                    <Marker
                        key={item.id}
                        coordinate={{latitude: item.location.latitude, longitude: item.location.longitude}}
                        onPress={() => {
                            this.setState({ selectedItem: item, modalVisible: true, destination: { latitude: item.location.latitude, longitude: item.location.longitude } });
                        }}
                    >
                       <View style={{ backgroundColor: 'white', padding: 2, borderRadius: 5 }}>
                        <Image
                            source={require('./wifi.png')}
                            style={{width: 25, height: 25}} // Ajusta el tamaño de la imagen aquí
                        />
                    </View>
                    </Marker>
                );
            }
        });
    }

    render() {
        const { origin, destination } = this.state;
        return (
            <React.Fragment>
                <ImageBackground
                    source={require('./montaña.jpg')}
                    style={styles.backgroundImage}>
                        <Text   style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'white',
              marginLeft: 20,
              marginBottom: 25,
            }}>
                            San Francisco del Monte de Oro como toda la Provincia de San Luis, cuenta con una red de internet inalámbrica gratuita en espacios públicos.
                        </Text>
                        <Text   style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'white',
              marginLeft: 20,
              marginBottom: 25,
            }}>
                            Podes encontrar puntos de acceso en los siguientes lugares en el mapa. Conectarte a estas redes wifi es muy sencillo, solo tenes que seleccionar la red y conectarte.
                        </Text>
                        <Text   style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'white',
              marginLeft: 20,
              marginBottom: 25,
            }}>
                            Comparte tus fotos y posteos, envia mensajes, mira videos o simplemente navega por la web. Todo de forma gratuita!!!
                        </Text>
                   
                        <MapView
                        provider={PROVIDER_GOOGLE} // Asegúrate de usar el proveedor de Google
                        customMapStyle={customStyle} // Aplica el estilo personalizado
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: this.state.center.latitude,
                            longitude: this.state.center.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {this.renderAnnotations()}
                    </MapView>
                </ImageBackground>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default GeoMapaWifi;