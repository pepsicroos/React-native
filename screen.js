import React, { Component } from 'react';
import { View, Text,StyleSheet, Image, TextInput } from 'react-native';
//importacion de objetos
export default class screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //aqui se declaran las variables
        atlas:0,
        Leones:6
    };
  }

  render() {
      //codigo frontend
    return (
      <View>
        <Text style={styles.Texto}> Partido </Text>
        <Image style={styles.Logo} source={require('./Imagenes/atlas.png')}/>
        <Text style={styles.TextoVS}> VS </Text>
        <Image style={styles.Logo} source={{uri:"https://3.bp.blogspot.com/-_yvG2oQ_CNw/WV19nCSv0QI/AAAAAAABLyo/UHEyf_I97VgTvXoePGVf_HfAGSJuJ7ngQCLcBGAs/s1600/Leones%2BNegros%2Bde%2Bla%2BUniversidad%2Bde%2BGuadalajara.png"}}/>
        
        <View style={styles.rowContainer}>
        <Text style={styles.Marcador}> Atlas: {this.state.atlas} </Text>
        <Text style={styles.Marcador}> Leones: {this.state.Leones} </Text>
        </View>

        <View style={styles.rowContainer}>
          <TextInput style={styles.Input} placeholder="Atlas"></TextInput>
          <TextInput style={styles.Input} placeholder="Leones"></TextInput>
        
        </View>
      
      
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  Texto:{
    fontSize: 30,
    color:"red",
    textAlign: "center",
    marginTop:30
  },
  Logo:{
    width:140,
    height:140,
    alignSelf:"center"
  }, 
  TextoVS:{
    fontSize: 40,
    color:"black",
    textAlign: "center",
    
  },
  Marcador:{
    fontSize: 30,
    color:"black",
    textAlign: "center",
    
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf:"center",
    marginTop:30
  }


  



});



