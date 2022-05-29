import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LOGIN from './Login';
import Registro from './Registro';
import Corredores from './Corredores';
import Mapa from './Mapa'
import Ranking from './Ranking';

export default class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            
          <Stack.Screen name="LOGIN" component={LOGIN} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Corredores" component={Corredores} />
          <Stack.Screen name="Mapa" component={Mapa} />
          <Stack.Screen name="Ranking" component={Ranking} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
