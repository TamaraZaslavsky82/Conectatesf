import React, {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {
  List,
  Button,
  Divider,
  Provider as PaperProvider,
  Card,
  Title,
} from 'react-native-paper';
import FeedbackForm from './FeedbackForm';
import aberturas from './iconos/aberturas.png';
import almacen from './iconos/almacen.png';
import bazar from './iconos/bazar.png';
import cabañas from './iconos/cabañas.png';
import cafeteria from './iconos/cafeteria.png';
import cerrajeria from './iconos/cerrajeria.png';
import clases from './iconos/clases.png';
import construccion from './iconos/construccion.png';
import correo from './iconos/correo.png';
import cultura from './iconos/cultural.png';
import delivery from './iconos/delivery.png';
import dietetica from './iconos/dietetica.png';
import estacion from './iconos/estacion.png';
import estetica from './iconos/estetica.png';
import farmacia from './iconos/farmacia.png';
import feria from './iconos/feria.png';
import ferreteria from './iconos/ferreteria.png';
import fiestas from './iconos/fiestas.png';
import forrajeria from './iconos/forrajeria.png';
import garrafa from './iconos/garrafa.png';
import guia from './iconos/guia.png';
import holistico from './iconos/holistico.png';
import hospital from './iconos/hospital.png';
import indumentaria from './iconos/indumentaria.png';
import informatica from './iconos/informatica.png';
import inmobiliaria from './iconos/inmobiliaria.png';
import juguetes from './iconos/juguetes.png';
import kiosco from './iconos/kiosco.png';
import libreria from './iconos/libreria.png';
import Lugares from './iconos/lugares.png';
import mecanico from './iconos/mecanico.png';
import merceria from './iconos/merceria.png';
import micro from './iconos/micros.png';
import pago from './iconos/pago.png';
import panaderia from './iconos/panaderias.png';
import productores from './iconos/productores.png';
import quinela from './iconos/quiniela.png';
import radios from './iconos/radios.png';
import recreativo from './iconos/recreativo.png';
import regionales from './iconos/regionales.png';
import remis from './iconos/remis.png';
import resto from './iconos/resto.png';
import servicios from './iconos/servicios.png';
import verdu from './iconos/verdu.png';
import viveros from './iconos/viveros.png';

const CategoriesScreen = ({ route, navigation }) => {
  const data = require('./data.json');

  const { selectedCategory: initialSelectedCategory } = route.params || {};

  const allCategories = data.map(item => {
    if (!item.category) {
      console.log('Elemento con categoría vacía:', item);
    }
    return item.category;
  });

  const uniqueCategories = allCategories
    .filter((category, index, self) => self.indexOf(category) === index)
    .sort((a, b) => a.localeCompare(b));

  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };
  const handleSubCategorySelect = subCategory => {
    setSelectedSubCategory(subCategory);
  };

  const handleBackToSubCategories = () => {
    setSelectedSubCategory(null);
  };

  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  // Si la categoría inicial cambia (por ejemplo, si se selecciona una nueva categoría desde 'ThreeCategoriesComponent'),
  // actualiza 'selectedCategory'
  useEffect(() => {
    setSelectedCategory(initialSelectedCategory);
  }, [initialSelectedCategory]);

  // ...


  const categoryIcons={
    'Aberturas': aberturas,
    'Actividades recreativas': recreativo,
    'Atencion medica': hospital,
  'Autoservicios - Despensas - Polirubros': almacen,
  'Bazar y hogar': bazar,
  'Alojamientos': cabañas,
  'Cafeterias': cafeteria,
  'Carnicerias - Verdulerias - Pollerias': verdu,
  'Centro Cultural': cultura,
  'Cerrajerias': cerrajeria,
  'Clases y Talleres': clases,
  'Construccion': construccion,
  'Correo': correo,
  'Deliverys': delivery,
  'Dieteticas': dietetica,
  'Estaciones de servicio': estacion,
  'Estetica': estetica,
  'Farmacias': farmacia,
  'Ferias americanas y venta de Garage': feria,
  'Ferreterias - Corralon - Pinturerias': ferreteria,
  'Fiestas Infantiles': fiestas,
  'Forrajerias': forrajeria,
  'Guias de Turismo': guia,
  'Holisticos': holistico,
  'Indumentaria': indumentaria,
  'Informatica - Electronica': informatica,
  'Inmobiliarias': inmobiliaria,
  'Jugueterias': juguetes,
  'Kioscos': kiosco,
  'Librerias - Graficas': libreria,
  'Lugares para comer': resto,
  'Lugares que tenes que conocer': Lugares,
  'Merceria': merceria,
  'Micros': micro,
  'Pago Facil - Western Union': pago,
  "Panaderias - Pastelerias": panaderia,
  'Productores - Emprendedores': productores,
  'Quiniela': quinela,
  'Radios y Programas': radios,
  'Regionales': regionales,
  'Remises': remis,
  'Servicios': servicios,
  'Talleres mecanicos': mecanico,
  'Viveros - Florerias': viveros,
  'Venta de Garrafas': garrafa,
  'Viveros': viveros,
  }

  const filteredData = selectedCategory
    ? data
        .filter(item => item.category === selectedCategory)
        .sort((a, b) => (b.status === 'Premium' ? 1 : -1))
    : [];

  const filteredSubCategoryData = selectedSubCategory
    ? filteredData
        .filter(item => item.subCategory === selectedSubCategory)
        .sort((a, b) => (b.status === 'Premium' ? 1 : -1))
    : [];


    
  const allSubCategories = filteredData
    .map(item => item.subCategory)
    .filter(subCategory => subCategory);

    const uniqueSubCategories = allSubCategories
    .filter((subCategory, index, self) => self.indexOf(subCategory) === index)
    .sort((a, b) => a.localeCompare(b)); // Cambiado de b.localeCompare(a) a a.localeCompare(b)

  return (
    <PaperProvider>
      <ImageBackground
        source={require('./montaña.jpg')}
        style={styles.backgroundImage}>
          
        <View
          style={{
            flex: 1,
           
            padding: 10,
          }}>
          {selectedCategory ? (
            <Button
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                marginTop: 10,
                color: 'darkviolet',
              }}
              onPress={handleBackToCategories}>
              Volver a las categorías
            </Button>
          ) : null}
          {!selectedCategory ? (
            <>
              <Text style={{fontSize: 20, textAlign: 'center', margin: 10}}>
                Aquí puedes encontrar todas las categorías disponibles
              </Text>
              <Text style={{fontSize: 20, textAlign: 'center', margin: 10}}>
             Si queres dejar una sugerencia o hacer un reclamo, con el area de Servicio al Consumidor dependiente del area de la municipalidad, podes hacerlo desde este boton.
              </Text>
              <Button
  style={{
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    color: 'darkviolet',
  }}
  onPress={() => navigation.navigate('FeedbackForm')}
>
  Acceder
</Button>
             <FlatList
  data={uniqueCategories}
  numColumns={1} // Cambiado de 2 a 1
  renderItem={({item}) => (
  <Card
  style={{...styles.card, maxWidth: '100%'}} // Cambiado de '60%' a '100%'
  onPress={() => handleCategorySelect(item)}>
  <Card.Content>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={categoryIcons[item]} style={{width: 30, height: 30, marginRight: 10}} />
          <Title style={styles.title}>{item}</Title>
        </View>
  </Card.Content>
</Card>
  )}
  keyExtractor={item => item}
  key="categories"
/>
            </>
          ) : uniqueSubCategories.length > 0 && !selectedSubCategory ? (
            <>
              <Button
                style={{
                  backgroundColor: 'white',
                  marginBottom: 10,
                  marginTop: 10,
                  color: 'black',
                }}
                onPress={handleBackToSubCategories}>
                Volver a Subcategorías
              </Button>
              <FlatList
                data={uniqueSubCategories}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleSubCategorySelect(item)}>
                    <List.Item
                      title={<Text style={{color: 'darkviolet'}}>{item}</Text>}
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
                ItemSeparatorComponent={Divider}
              />
            </>
          ) : (
            <FlatList
              data={
                selectedSubCategory ? filteredSubCategoryData : filteredData
              }
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item.status === 'Free') {
                      navigation.navigate('Detail', {itemData: item});
                    } else if (item.status === 'Premium') {
                      navigation.navigate('PremiumDetail', {itemData: item});
                    } else if (item.status === 'Lugares') {
                      navigation.navigate('Lugares', {itemData: item});
                    }
                  }}>
                  <List.Item
                    title={
                      <Text style={{color: 'black'}}>{item.title}</Text>
                    }
                    description={
                      <Text
                        style={{
                          color: 'darkviolet',
                        }}>{`${item.description}`}</Text>
                    }
                    left={() => (
                      item.status === 'Premium' ? 
                      <Image
                        source={require('./estrella.png')}
                        style={{width: 30, height: 30}}
                      /> : null
                    )}
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Divider}
              />
          )}
        </View>
      </ImageBackground>
    </PaperProvider>
  );
                    }
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      marginBottom:60
    },
    card: {
      justifyContent: 'flex-start', // Añadido para alinear el contenido a la izquierda
      alignItems: 'flex-start',
      padding: 2,
      maxWidth: '60%',
      marginBottom: 2,
      marginTop: 2,
      marginLeft: 10,
      backgroundColor: '#fff', // Asegúrate de tener un color de fondo para que la sombra sea visible
      shadowColor: '#000', // El color de la sombra debe ser oscuro para que sea visible
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      color:'black'
    },
  });
  export default CategoriesScreen;