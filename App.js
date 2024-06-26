import 'react-native-gesture-handler';
import React, {useState, useRef, useEffect} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  Image, TextInput, TouchableOpacity, FlatList, Linking
} from 'react-native';
import LottieView from 'lottie-react-native';
import CategoriesScreen from './Categories';
import {Searchbar, Card,FAB,Button} from 'react-native-paper';
import { Button as PaperButton } from 'react-native-paper';
import data from './data.json';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import  Icon  from 'react-native-vector-icons/Ionicons';
import DetailScreen from './DetailScreen';
import axios from 'axios';
import GeoMapa from './GeoMapa';
import { useNavigation } from '@react-navigation/native';
import PremiumDetail from './PremiumDetail';
import { LogBox } from 'react-native';
import Lugares from './Lugares';
import Fuse from 'fuse.js';
import HomeIcon from './home.png';
import CategoriesIcon from './menu.png';
import GeoMapaIcon from './localizacion.png';
import clearSky from './clear.jpg';
import rain from './rain.jpeg';
import thunderstorm from './lightening.jpg';
import wind from './windy.jpg';
import clouds from './clouds.jpg';
import AddBanner from './AddBnner';
import ContactFormScreen from './ContactForm';
import EventComponent from './Event';
import EventIcon from './estrella.png';
import PushNotification from 'react-native-push-notification';
import GeoMapaWifi from './GeomapaWifi';
import FeedbackForm from './FeedbackForm';
import MunicipalityInfo from './MunicipalityInfo';
import dataEvents from './dataevent.json';
import searchIcon from './lupa.png';
import ThreeCategoriesComponent from './ThreeCategoriesComponent';


LogBox.ignoreLogs(['new NativeEventEmitter()']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const AnimationScreen = ({navigation}) => {
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'transparent',
        }}
        source={require('./animacion.json')}
        speed={3}
        loop={false}
        onAnimationFinish={() => {
          navigation.replace('App');
        }}
      />
    </View>
  );
};




const AppTabs = () => {
  // ...

  return (
    <View style={{ flex: 1 }}>
     <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let icon;

      if (route.name === 'Conectate') {
        icon = HomeIcon;
      } else if (route.name === 'Categorias') {
        icon = CategoriesIcon;
      } else if (route.name === 'GeoMapa') {
        icon = GeoMapaIcon;
      } else if (route.name === 'Eventos') {
        icon = EventIcon; 
      }

      // Solo devolver un componente de imagen si hay un icono
      if (icon) {
        return <Image source={icon} style={{ width: 30, height: 30, tintColor: focused ? 'blue' : 'gray' }} />;
      }
    },
    tabBarLabel: ({ focused, color }) => {
      let labelName;
      let customColor;

      if (route.name === 'Conectate') {
        labelName = 'Conectate';
        customColor = focused ? 'blue' : 'gray';
      } else if (route.name === 'Categorias') {
        labelName = 'Categorias';
        customColor = focused ? 'blue' : 'gray';
      } else if (route.name === 'GeoMapa') {
        labelName = 'GeoMapa';
        customColor = focused ? 'blue' : 'gray';
      } else if (route.name === 'Eventos') {
        labelName = 'Eventos';
        customColor = focused ? 'blue' : 'gray';
      } else if (route.name === 'Sumate!') {
        labelName = 'Sumate!';
        customColor = focused ? 'darkviolet' : 'gray'; // Cambiado el color cuando está enfocado a 'darkviolet' solo para 'Sumate!'
      }

      return <Text style={{ color: customColor }}>{labelName}</Text>;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
      position: 'absolute',
      backgroundColor: '#ffffff',
    },
  })}
>
        <Tab.Screen name="Conectate" component={HomeScreen} />
        <Tab.Screen name="Categorias" component={CategoriesScreen} />
        <Tab.Screen name="GeoMapa" component={GeoMapa} />
        <Tab.Screen name="Eventos" component={EventComponent} /> 
        <Tab.Screen name="Sumate!" component={ContactFormScreen} /> 
      </Tab.Navigator>
      <View style={{ position: 'absolute', bottom: 60, width: '100%', zIndex: 1 }}>
        <AddBanner />
      </View>
    </View>
  );
};




class App extends React.Component {
  componentDidMount() {
    PushNotification.createChannel(
      {
        channelId: "your-channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    dataEvents.forEach(event => {
      PushNotification.localNotification({
        channelId: "your-channel-id",
        title: "Nuevo evento",
        message: `Hay un nuevo evento: ${event.title}`,
      });
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AnimationScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="AnimationScreen" component={AnimationScreen} />
          <Stack.Screen name="App" component={AppTabs} />
          <Stack.Screen 
            name="Detail" 
            component={DetailScreen} 
            options={{headerShown: true, title: 'Descripcion'}} // Cambia el nombre en la barra de navegación
          />
          <Stack.Screen 
            name="PremiumDetail" 
            component={PremiumDetail} 
            options={{headerShown: true, title: 'Descripcion Premium'}} // Cambia el nombre en la barra de navegación
          />
          <Stack.Screen
            name="Lugares"
            component={Lugares}
            options={{headerShown: true}} 
            />
             <Stack.Screen
            name="GeoMapaWifi"
            component={GeoMapaWifi}
            options={{headerShown: true}} 
            />
              <Stack.Screen name="Contacto" component={ContactFormScreen} options={{headerShown: true, title: 'Sumate'}} /> 
              <Stack.Screen name="FeedbackForm" component={FeedbackForm} options={{headerShown: true, title: 'Deja tu Consulta o Reclamo!'}} /> 
              <Stack.Screen name="MunicipalityInfo" component={MunicipalityInfo} options={{headerShown: true, title: 'Municipalidad'}} /> 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const HomeScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
const [searchQuery, setSearchQuery] = React.useState('');
  const [randomCards, setRandomCards] = React.useState([]);
  const [weatherData, setWeatherData] = useState(null);
 
const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=San Francisco del Monte de Oro,ar&appid=92cfc5f22160d5a5d90297a265b279de`);
          const data = await response.json();
          setWeatherData(data);
          console.log("Weather data: ", data);
        } catch (error) {
          console.error("Error fetching weather data: ", error);
        }
      };

      fetchWeather();
    }, []);

  const weatherBackgrounds = {
    'Clear': clearSky,
    'Rain': rain,
    'Thunderstorm': thunderstorm,
    'Wind': wind,
    'Clouds': clouds,
  };

    const options = {
      keys: ['name', 'category', 'title', 'description', 'subCategory', 'phone', 'status','tags'],
      threshold: 0.1
    };

    const fuse = new Fuse(data, options);
    const handleChangeText = (text) => {
      console.log("Search query: ", text); // Log the search query
      setSearchQuery(text);
      const results = fuse.search(text);
      console.log("Search results: ", results); // Log the search results
      if (results.length > 0) {
        const result = results.map(({ item }) => item);
        setFilteredData(result);
      } else {
        setFilteredData([]);
      }
      console.log("Filtered data: ", filteredData); // Log the filtered data
    };
  // Función para obtener un número aleatorio
  const getRandomInt = max => {
    return Math.floor(Math.random() * max);
  };

  // Efecto para seleccionar tres elementos aleatorios
  // Efecto para seleccionar tres elementos aleatorios
  React.useEffect(() => {
    const premiumData = data.filter(item => item.status === 'Premium');
    const randomIndices = new Set();
    while (randomIndices.size < 3) {
      randomIndices.add(getRandomInt(premiumData.length));
    }
    setRandomCards([...randomIndices].map(index => premiumData[index]));
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const premiumData = data.filter(item => item.status === 'Premium');
      const randomIndices = new Set();
      while (randomIndices.size < 4) {
        randomIndices.add(getRandomInt(premiumData.length));
      }
      setRandomCards([...randomIndices].map(index => premiumData[index]));
    }, []),
  );


  return (
    <ScrollView>  
    <ImageBackground
      source={require('./montaña.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView>
       {weatherData && (
  <ImageBackground
    source={weatherBackgrounds[weatherData.weather[0].main]}
    style={{flex: 1}}>
    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
<View style={{flexDirection: 'row', alignItems: 'center'}}>
  <Image
    source={{uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}}
    style={{width: 150, height: 150}} // Aumenta estas dimensiones para hacer el icono más grande
  />
  <Text
    style={{
      fontSize: 50, // Aumenta este valor para hacer la temperatura más grande
      fontWeight: 'bold',
      color: 'white',
      marginLeft: 20,
    }}>
    {Math.round(weatherData.main.temp - 273.15)}°C
  </Text>
</View>
      <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
        Térmica: {Math.round(weatherData.main.feels_like - 273.15)}°C
      </Text>
      <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
        Viento: {(weatherData.wind.speed * 3.6).toFixed(2)} km/h
      </Text>
      <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
        Rachas: {(weatherData.wind.gust * 3.6).toFixed(2)} km/h
      </Text>
      {/* Aquí puedes agregar los componentes de texto para la predicción de 3 días */}
    </View>
  </ImageBackground>
)}
          <Text
            style={{
              fontSize: 55,
              fontWeight: 'bold',
              marginTop: 50,
              color: 'white',
              marginLeft: 20,
            }}>
        
            Conectate
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
               color: 'white',
              marginLeft: 20,
            }}>
        
          San Francisco
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'white',
              marginLeft: 20,
              marginBottom: 25,
            }}>
            Una App donde vas a poder encontrar todos contactos que necesitas en San Francisco del Monte de Oro
          </Text>
              <ThreeCategoriesComponent/>
          <Searchbar
  style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10, margin: 10, shadowColor: 'black', shadowOffset: {width: 5, height: 5}, shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 }}
  inputStyle={{ color: '#9400D3' }}
  onChangeText={handleChangeText}
  value={searchQuery}
  placeholder="Realiza tu busqueda..."
  placeholderTextColor="#9400D3"
  icon={() => <Image source={searchIcon} style={{width: 25, height: 25}} />} // Agrega esta línea
/>
{searchQuery && (
  <View style={{backgroundColor: 'white'}}>
    <FlatList
      data={filteredData}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {
          // Navega a 'Detail' o 'PremiumDetail' dependiendo del estado del item
          if (item.status === 'Free') {
            navigation.navigate('Detail', { itemData: item });
          } else if (item.status === 'Premium') {
            navigation.navigate('PremiumDetail', { itemData: item });
          }
          else if (item.status === 'Lugares') {
            navigation.navigate('Lugares', { itemData: item });
          }
          setSearchQuery('');
        }}>
          <Text style={{ color: '#9400D3' }}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
)}
            
            <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'white',
              marginLeft: 20,
              marginBottom: 25,
            }}>
           Conoce nuestra Municipalidad
          </Text>
     <TouchableOpacity
  style={styles.buttonContainer}
  onPress={() => navigation.navigate('MunicipalityInfo')}
>
  <Text style={styles.buttonText}>Ir a Municipalidad</Text>
</TouchableOpacity>
          <Text  style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'white',
              marginLeft: 20,
            }}>Conoce los servicios destacados</Text>
          <ScrollView>
           

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
  {randomCards.map(item => (
    <Card key={item.id} style={{ margin: 10, width: '45%' }}>
      <Card.Title  title={item.title} titleStyle={{color: '#9400D3'}} />

      <Card.Content style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textcards}>{item.title}</Text>
          <Image source={require('./estrella.png')} style={{width: 15, height: 15, marginLeft: 5}} />
        </View>
        <Text style={styles.textcards} >{item.description.substring(0, 50)}...</Text>
        <Text style={styles.textcards} >{item.phone}</Text>
      </Card.Content>

      <FAB
        small
        label='Mas Info'
        icon={() => <Image source={require('./info.png')} style={{width: 24, height: 24}} />}
        onPress={() => {
          // Navega a 'Detail' o 'PremiumDetail' dependiendo del estado del item
          if (item.status === 'Free') {
            navigation.navigate('Detail', { itemData: item });
          } else if (item.status === 'Premium') {
            navigation.navigate('PremiumDetail', { itemData: item });
          }
          else if (item.status === 'Lugares') {
            navigation.navigate('Lugares', { itemData: item });
          }
        }}
      />
    </Card>
  ))}
</View>
          </ScrollView>
           
    
 <Text style={{
              fontSize: 40,
              fontWeight: 'bold',
              marginTop: 50,
              color: 'white',
              marginLeft: 20,
            }}>Puntos WIFI libres y gratuitos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('GeoMapaWifi')}>
            <Card style={{ margin: 10, elevation: 5 }}>
              <Card.Cover source={require('./bannerpuntos.jpg')} style={{ borderRadius: 10, height:350 }} />
            </Card>
          </TouchableOpacity>
          <View>
            <Text style={{
              fontSize: 40,
              fontWeight: 'bold',
              marginTop: 50,
              color: 'white',
              marginLeft: 20,
            }}>Conectate con los servicios mas cercanos!!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('GeoMapa')}>
            <Card style={{ margin: 10, elevation: 5 }}>
              <Card.Cover source={require('./mapa.png')} style={{ borderRadius: 10 }} />
            </Card>
          </TouchableOpacity>

          </View>
          
        </ScrollView>
      </View>
   
    </ImageBackground>
    </ScrollView>
  );
          }
const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90CAF9 ',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#000066',
    marginBottom:65
  },
  container: {
    flex: 1,
    left: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: -250,
  },
  buttonContainer: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,

    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'left',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    color:'black',
    bottom: 0,
  },
  title:{
    color:'black'
  },
  subtitle:{
    color:'black'
  },
  description:{
    color:'black'
  },
  textcards:{
    color:'#9400D3'
  }
});

export default App;
