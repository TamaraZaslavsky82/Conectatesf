import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import dataEvents from './dataevent.json'; // Asegúrate de que la ruta al archivo JSON es correcta
import PushNotification from 'react-native-push-notification';

const EventComponent = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    setEvents(dataEvents);
    dataEvents.forEach(event => {
  PushNotification.localNotification({
    /* Agrega un ID de canal */
    channelId: "your-channel-id",
    title: "Nuevo evento",
    message: `Hay un nuevo evento: ${event.title}`,
  });
});
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {setSelectedImage(item.image[0]); setModalVisible(true);}}>
      <Image source={{ uri: item.image[0] }} style={{ width: 100, height: 100 }} />
      <Text>{item.title}</Text> 
    </TouchableOpacity>
  );

  if (events.length === 0) {
    return <Text>Aún no tenemos eventos disponibles para vos</Text>;
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedImage(null);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <TouchableOpacity onPress={() => {setModalVisible(false); setSelectedImage(null);}} style={{ position: 'absolute', top: 50, right: 30 }}>
            <Text style={{ fontSize: 30, color: '#fff' }}>X</Text>
          </TouchableOpacity>
          {selectedImage && (
            <TouchableOpacity onPress={() => {setModalVisible(false); setSelectedImage(null);}}>
              <Image 
                source={{ uri: selectedImage }} 
                style={{ width: 400, height: 500 }} 
                onError={(error) => setImageError(error.nativeEvent.error)}
              />
            </TouchableOpacity>
          )}
          {imageError && <Text>Error loading image: {imageError}</Text>}
        </View>
      </Modal>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default EventComponent;