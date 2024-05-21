import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import dataEvents from './dataevent.json';
import PushNotification from 'react-native-push-notification';

const EventComponent = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imageError, setImageError] = useState(null);

 useEffect(() => {
  setEvents(dataEvents);
  dataEvents.forEach(event => {
    PushNotification.localNotification({
      channelId: "your-channel-id",
      title: "Nuevo evento",
      message: `Hay un nuevo evento: ${event.title}`,
    });
  });
}, []);

  const renderItem = ({ item }) => {
    console.log('Rendering item', item.id);
    return (
      <View style={{ alignItems: 'center' }}>
        <Image source={{ uri: item.image[0] }} style={{ width: 190, height: 190, marginTop:10 }} />
        <Text style={{ textAlign: 'center', fontSize:18, color:'darkviolet', marginTop:10 }}>{item.title}</Text>
        <TouchableOpacity style={{ backgroundColor: 'darkviolet', padding: 10, borderRadius: 5, marginTop: 10 }} onPress={() => {setSelectedEvent(item); setModalVisible(true);}}>
          <Text style={{ color: '#fff' }}>Más info</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          setSelectedEvent(null);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40, 116, 166)' }}>
          <TouchableOpacity onPress={() => {setModalVisible(false); setSelectedEvent(null);}} style={{ position: 'absolute', top: 50, right: 30 }}>
            <Text style={{ fontSize: 30, color: '#fff' }}>X</Text>
          </TouchableOpacity>
          {selectedEvent && (
            <View>
              <TouchableOpacity onPress={() => {setModalVisible(false); setSelectedEvent(null);}}>
                <Image 
                  source={{ uri: selectedEvent.image[0] }} 
                  style={{ width: 400, height: 400, marginTop:10 }} // Cambié el tamaño de la imagen aquí
                  onError={(error) => console.log('Error loading image for item', selectedEvent.id, error)}
                />
              </TouchableOpacity>
              <Text style={{ color: '#fff', marginTop: 10, fontSize:20,textAlign: 'center', lineHeight: 24 }}>{selectedEvent.description}</Text>
            </View>
          )}
          {imageError && <Text>Error loading image: {imageError}</Text>}
        </View>
      </Modal>
      <FlatList
        data={events}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default EventComponent;