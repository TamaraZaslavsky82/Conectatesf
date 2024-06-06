import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import data from './data.json';

const ThreeCategoriesComponent = () => {
  const navigation = useNavigation();
  const data = require('./data.json');
  const categoryIcons = {
    'Alojamientos': require('./iconos/cabañas.png'), // Reemplaza 'path_to_icon' con la ruta al icono correspondiente
    'Lugares para comer': require('./iconos/resto.png'),
    //'Regionales': require('./iconos/regionales.png'),
    'Lugares que tenes que conocer': require('./iconos/lugares.png'),
  };

  const categories = Object.keys(categoryIcons);

  const handleCategorySelect = (category) => {
    const categoryData = data.filter(item => item.categoria === category);
    navigation.navigate('Categorias', { selectedCategory: category, data: categoryData });
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', color: 'white', marginLeft: 24}}>Categorías</Text> 
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
     {categories.map((category) => {
  const words = category.split(' ');
  return (
    <Card key={category} onPress={() => handleCategorySelect(category)} style={{ margin: 5 }}>
      <Card.Content>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          {categoryIcons[category] ? (
            <Image source={categoryIcons[category]} style={{ width: 50, height: 50, marginBottom: 10 }} />
          ) : null}
          <Text style={{fontSize: 10, flexWrap: 'wrap', flex: 1, color: '#800080'}}>
            {category === 'Lugares que tenes que conocer' ? 
              words.slice(0, 2).join(' ') + '\n' + words.slice(2).join(' ') : 
              words[0] + '\n' + words.slice(1).join(' ')
            }
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
})}
        <Card >
          <Card.Content>
            <TouchableOpacity onPress={() => navigation.navigate('Categorias')}>
              <Text style={{color: 'blue'}}>+</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default ThreeCategoriesComponent;