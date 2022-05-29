import React, { Component } from 'react'; 
import { View, Text , ImageBackground,StyleSheet, Dimensions, TouchableOpacity, TextInput,Alert } from 'react-native'; 
import { NavigationContext } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


 
export default class Screen extends Component {
      static contextType = NavigationContext;
  constructor(props) { 
    super(props); 
    this.state = { 
      login:"",
      password:"",
    }; 
  } 

  
 
  render() {
       const navigation = this.context;
       
      const LOGIN = () =>{ 
      console.log ("Diste click a login");
      navigation.navigate('Registro');
      } 

      const ENTRAR =() =>{
        AsyncStorage.clear();
        var xhttp= new XMLHttpRequest();
        let _this=this;
        xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            console.log(xhttp.responseText);
            if (xhttp.responseText=='1'){
              
              console.log("Usuario autentificado");
              navigation.navigate('Corredores');

              const jsonValue=JSON.stringify([_this.state.login]);
              console.log("Entrada: "+jsonValue);


              AsyncStorage.setItem('UDATA',jsonValue)
            }
          
          if(xhttp.responseText=='2'){
            Alert.alert("Error","Password Erroneo intente de nuevo",[{text:"OK", onPress:()=> console.log("pass error")}]);

          }

          if(xhttp.responseText=='0'){
            Alert.alert("Error","Usuario no reconocido intente de nuevo",[{text:"OK", onPress:()=> console.log("user error")}]);

          }
          
          }
        };
        xhttp.open("GET","http://prograinternet.bare-technology.com.mx/Login.php?codigo="+this.state.login+"&password="+this.state.password, true);
        console.log("http://prograinternet.bare-technology.com.mx/Login.php?codigo="+this.state.login+"&password="+this.state.password);
        xhttp.send();
        
      }
    return ( 
      <View> 
        <ImageBackground source={require("./Imagenes/Login-bare-technology.jpg")} style={styles.fondo}>
        <View style={styles.rowContainer}>
          <TextInput style={styles.InputCodigo} placeholder="Codigo" onChangeText={login=>this.setState({login})}></TextInput>
          <TextInput style={styles.InputConstraseña} secureTextEntry={true} placeholder="Contraseña"  onChangeText={password=>this.setState({password})}></TextInput>
        
        </View>

            <View style={styles.btn1}> 
                <TouchableOpacity onPress={ENTRAR} hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}> 
 
              <Text> </Text>       
 
                </TouchableOpacity> 
              
            </View> 
 
            <View style={styles.btn2}> 
                <TouchableOpacity onPress={ LOGIN}   hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}> 
 
              <Text> </Text>       
 
                </TouchableOpacity> 
              
            </View> 
        </ImageBackground> 
      </View> 
    ); 
  } 
} 
 
const styles = StyleSheet.create({ 
    fondo:{ 
        width:Dimensions.get("screen").width, 
        height:Dimensions.get("screen").height, 
    }, 
    btn1:{ 
        //borderWidth:1, 
        width:'40%', 
        height:'6%', 
        //borderColor:"white", 
        top:'67%',
        left:'56%',
        position:'absolute'
        
    },
    btn2: {
        //borderWidth:1, 
        width:'40%', 
        height:'6%', 
        //borderColor:"white", 
        top:'67%',
        left: '4%',
        position:'absolute'
    },
    InputCodigo:{
      flex:0,
      top:'345.5%',
      left:'26%'
      
    },
    InputConstraseña:{
      flex:0,
      top:'370.5%',
      left:'26%'
  
    }
})