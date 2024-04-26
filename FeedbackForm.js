import React, { useState } from 'react';
import { Button, TextInput, View, Linking, StyleSheet, ImageBackground } from 'react-native';

const FeedbackForm = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const emailRecipient = 'tamaraanabellazaslavsky@gmail.com';
    const emailSubject = 'Mensaje de la aplicación React Native';
    const emailBody = `De: ${email}\nMensaje: ${message}`;

    const mailtoLink = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    Linking.canOpenURL(mailtoLink)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${mailtoLink}`);
        } else {
          Linking.openURL(mailtoLink);
          setEmail('');
          setPhoneNumber('');
          setMessage('');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <ImageBackground source={require('./montaña.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Mensaje"
          value={message}
          onChangeText={setMessage}
          style={styles.inputMessage}
          multiline
        />
        <Button title="Enviar" onPress={handleSubmit} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputMessage: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default FeedbackForm;