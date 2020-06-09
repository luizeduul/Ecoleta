import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';

import styles from './styles';


interface IBGEUfResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const navigation = useNavigation();

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      borderColor: 'gray',
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      borderColor: 'gray',
      justifyContent: 'center',
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

  function handleNavigationToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    });
  }

  useEffect(() => {
    axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
      })
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      })
  }, [selectedUf]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <RNPickerSelect
            value={selectedUf}
            onValueChange={setSelectedUf}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: 'Selecione a UF' }}
            style={pickerSelectStyles}
            Icon={() => {
              return (
                <Text style={{ paddingTop: 18, paddingRight: 5 }}>
                  <Icon name="arrow-down" size={24} color="#34CB79" />
                </Text>
              );
            }}
            items={ufs.map(uf => ({
              label: uf,
              value: uf
            }))}
          />

          <RNPickerSelect
            value={selectedCity}
            onValueChange={setSelectedCity}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: 'Selecione a cidade' }}
            style={pickerSelectStyles}
            Icon={() => {
              return (
                <Text style={{ paddingTop: 18, paddingRight: 5 }}>
                  <Icon name="arrow-down" size={24} color="#34CB79" />
                </Text>
              );
            }}
            items={cities.map(city => ({
              label: city,
              value: city
            }))}
          />
          <RectButton style={[styles.button]} onPress={handleNavigationToPoints} >
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Home;
