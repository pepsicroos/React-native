import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions, ImageBackground,TextInput,TouchableOpacity,Alert } from 'react-native';
import { NavigationContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class Registro extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      nombre:"",
      codigo:"",
      correo:"",
      telefono:"",
      password:"",
      centro:"",
      semestre:""
    };
  }

  render() {
    const navigation = this.context;

    const ENTRAR =() =>{

      if(!this.state.nombre.trim() || !this.state.codigo.trim() || !this.state.correo.trim() || !this.state.telefono.trim() || !this.state.password.trim() || !this.state.centro.trim() || !this.state.semestre.trim()){
        Alert.alert("Error","No debes de dejar ningun campo vacio",[{text:"OK", onPress:()=> console.log("No debes de dejar ningun campo vacio")}])
      }
      else{
        if(!(/^\d+$/.test(this.state.codigo))  || !(/^\d+$/.test(this.state.telefono)) ){
          Alert.alert("Error","Telefono y codigo solo acepta numeros",[{text:"OK", onPress:()=> console.log("Telefono y codigo solo acepta numeros")}])
  
        }
        else{
          var xhttp= new XMLHttpRequest();
      xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
          console.log(xhttp.responseText);
          if (xhttp.responseText=='1'){
            console.log("Registro autentificado");
            Alert.alert("OK","Registro autenticado",[{text:"OK", onPress:()=> console.log("Registro correcto")}]);


            var xhttp2= new XMLHttpRequest();
      
            xhttp2.onreadystatechange=function(){
              if(this.readyState==4 && this.status==200){
                
                console.log(xhttp2.responseText);

              }

            };
            xhttp2.open("GET","http://prograinternet.bare-technology.com.mx/numberoffiles.php");
                xhttp2.send();
                console.log("http://prograinternet.bare-technology.com.mx/numberoffiles.php");
       
   
          }
        
      
        if(xhttp.responseText=='0'){
          Alert.alert("Error","Error en la consulta",[{text:"OK", onPress:()=> console.log("consulta error")}]);

        }
        
        }
      };
      xhttp.open("GET","http://prograinternet.bare-technology.com.mx/Registro.php?nombre="+this.state.nombre+"&codigo="+this.state.codigo+"&correo="+this.state.correo+"&telefono="+this.state.telefono+"&passpelon="+this.state.password+"&centro="+this.state.centro+"&semestre="+this.state.semestre, true);
      console.log("http://prograinternet.bare-technology.com.mx/Registro.php?nombre="+this.state.nombre+"&codigo="+this.state.codigo+"&correo="+this.state.correo+"&telefono="+this.state.telefono+"&passpelon="+this.state.password+"&centro="+this.state.centro+"&semestre="+this.state.semestre);
      xhttp.send();

      
      



        }

        
        
      }
      
      
    }


   
    
    return (
      <View>
        <ImageBackground source={require("./Imagenes/Registro-bare-technology.jpg")} style={styles.fondo}>
        <Text style={styles.Texto}> REGISTRO </Text>
        <TextInput style={styles.InputNombre} placeholder="Nombre"  onChangeText={nombre=>this.setState({nombre})} ></TextInput>
        <TextInput style={styles.InputCodigo} placeholder="Codigo"  mask='999-99999' onChangeText={codigo=>this.setState({codigo})} ></TextInput>
        <TextInput style={styles.InputConstrasena} placeholder="Contraseña" secureTextEntry={true} onChangeText={password=>this.setState({password})}></TextInput>
        <TextInput style={styles.InputTelefono} placeholder="Telefono"  keyboardType='number-pad' onChangeText={telefono=>this.setState({telefono})} ></TextInput>
        <TextInput style={styles.InputEscuela} placeholder="Escuela" onChangeText={centro=>this.setState({centro})} ></TextInput>
        <TextInput style={styles.InputGrado} placeholder="Semestre"  keyboardType='number-pad' maxLength={10}  onChangeText={semestre=>this.setState({semestre})}></TextInput>
        <TextInput style={styles.InputCorreo} placeholder="Correo" onChangeText={correo=>this.setState({correo})} ></TextInput>

        <View style={styles.btn1}> 
                <TouchableOpacity  onPress={ENTRAR} hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}> 
 
              <Text> </Text>       
 
                </TouchableOpacity> 
              
            </View> 

        <View style={styles.btnback}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }} > 
 
          <Text> </Text>       

        </TouchableOpacity>
        </View> 
        </ImageBackground> 
      </View>
    );
  }

  
}


const styles = StyleSheet.create({ 
  Texto:{
    fontSize: 30,
    color:"black",
    textAlign: "center",
    marginTop:'10%'
  },
  fondo:{ 
      width:Dimensions.get("screen").width, 
      height:Dimensions.get("screen").height, 
  }, 
  btn1:{ 
      borderWidth:2, 
      width:'38%', 
      height:'6%', 
      borderColor:"white", 
      top:'15%',
      left:'31%'
  },
  btn2: {
      //borderWidth:2, 
      width:'38%', 
      height:'4%', 
      //borderColor:"white", 
      top:'51%',
      left: '4%'
  },
  InputNombre:{
    top:'8.5%',
    left:'26%'
    
  },
  InputCodigo:{
    top:'8.9%',
    left:'26%'

  },
  InputConstrasena:{
    flex:0,
    top:'9.4%',
    left:'26%'

  },
  InputTelefono:{
    top:'9.9%',
    left:'26%'

  },
  InputEscuela:{
    top:'10.5%',
    left:'26%'

  },
  InputGrado:{
    top:'11.7%',
    left:'26%'

  },
  InputCorreo:{
    top:'12%',
    left:'26%'

  },
  btnback:{
    borderWidth:2, 
    width:'18%', 
    height:'9%', 
    borderColor:"white", 
    top:'81%',
    left: '0%',
    position:'absolute'

  }

})
