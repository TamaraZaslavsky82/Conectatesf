import { Image } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ads = [
    { id: 1, content: 'https://i.imgur.com/65tf0BQ.png' },
    { id: 2, content: 'https://i.imgur.com/UGHRigs.jpeg' },
    { id: 3, content: 'https://i.imgur.com/44WsXcm.jpeg'},
    { id: 4, content: 'https://i.imgur.com/9IgLTcd.jpeg' },
    { id: 5, content: 'https://i.imgur.com/v9un8aS.jpeg' },
    { id: 6, content: 'https://i.imgur.com/guUGgdH.jpeg' },
    { id: 7, content: 'https://i.imgur.com/pQnQ7hZ.jpeg' },
   
    // Agrega más anuncios aquí
];

const AdBanner = () => {
    const [ad, setAd] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isVisible) {
            showRandomAd();
        }
    }, [isVisible]);

    const showRandomAd = () => {
        let newAd;
        do {
            newAd = ads[Math.floor(Math.random() * ads.length)];
        } while (ad && newAd.id === ad.id);
        setAd(newAd);
        setIsVisible(true); // Agrega esta línea
    };

    const closeAd = () => {
        setIsVisible(false);
        setAd(null);
        setTimeout(() => {
            showRandomAd();
        }, 5000); // Muestra un nuevo anuncio después de 20 segundos
    };

    if (!isVisible || !ad) return null;

    return (
        <View style={{ position: 'absolute', bottom: 0, }}>
            <TouchableOpacity onPress={closeAd}>
                <Text style={{backgroundColor:'white', width:130, color:'darkviolet'}}>Cerrar Publicidad</Text>
            </TouchableOpacity>
           <Image source={{ uri: ad.content }} style={{ width: 420, height: 70 }} />
        </View>
    );
};

export default AdBanner;