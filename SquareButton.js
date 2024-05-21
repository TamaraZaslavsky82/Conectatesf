import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const SquareButton = ({ area, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{area}</Text>
  </TouchableOpacity>
);

const Container = () => (
  <View style={styles.container}>
    {/* Render SquareButton components here */}
  </View>
);

const styles = StyleSheet.create({
  button: {
    width: '33.33%',
    height:100, // Esto hará que 3 botones encajen exactamente en una fila
    aspectRatio: 1, // Esto mantendrá el botón cuadrado
    justifyContent: 'center',
    marginVertical: 0.5,
    alignItems: 'center',
    backgroundColor: 'darkviolet',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row', // Asegúrate de que esto esté configurado como 'row'
    flexWrap: 'wrap', // Esto permitirá que los botones se envuelvan a la siguiente línea
  },
});

export default SquareButton;