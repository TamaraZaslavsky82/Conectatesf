import { Image } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ads = [
    { id: 1, content: 'https://i.imgur.com/65tf0BQ.png' },
    { id: 2, content: 'https://i.imgur.com/65tf0BQ.png' },
    { id: 3, content: 'https://i.imgur.com/65tf0BQ.png'},
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
        if (!isVisible) return;
        let newAd;
        do {
            newAd = ads[Math.floor(Math.random() * ads.length)];
        } while (ad && newAd.id === ad.id);
        setAd(newAd);
    };

    const closeAd = () => {
        setIsVisible(false);
        setAd(null); // Agrega esta línea
        setTimeout(() => {
            setIsVisible(true);
        }, 55000); // Muestra un nuevo anuncio después de 1 minuto
    };

    if (!isVisible || !ad) return null; // Mueve esta línea aquí

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