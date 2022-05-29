import MenuDrawer from 'react-native-side-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from 'react-native-user-avatar';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { NavigationContext } from '@react-navigation/native';




export default class Corredores extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      runners:'',
      open: false,
      nombre:'',
      codigo:'',
      centro:'',
      nc:'',
      foto:'',
    };
  }

  toggleOpen = async() => {
    this.setState({ open: !this.state.open });

    let _this=this;

    try {
      const jsonval2= await AsyncStorage.getItem('UDATA');
    var codigo= JSON.parse(jsonval2);
    console.log("Valor guardado: "+codigo[0]);

    var xhttp2= new XMLHttpRequest();

    xhttp2.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        console.log(xhttp2.responseText);
        var datosalumno=xhttp2.responseText;
        var datos=datosalumno.split(',');
        _this.setState({nombre:datos[0]});
        _this.setState({codigo:datos[1]});
        _this.setState({centro:datos[2]});
        _this.setState({nc:datos[3]});
        _this.setState({foto:datos[4]});
        const jsonValue3=JSON.stringify([_this.state.nombre,_this.state.codigo, _this.state.centro, _this.state.nc, _this.state.foto]);
        console.log("Datos alumno: "+jsonValue3);


              AsyncStorage.setItem('ADATA',jsonValue3);
        
        

      }
    }
    
    xhttp2.open("GET","http://prograinternet.bare-technology.com.mx/showdata.php?codigo="+codigo[0], true);
        console.log("http://prograinternet.bare-technology.com.mx/showdata.php?codigo="+codigo[0]);
        xhttp2.send();
      
    } catch (error) {
      console.log("Que pex");
      
    }
  };

  datosu =async() =>{
    
    
    
        
        

    

  }

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        
      <View>
      <UserAvatar size={100}  src={this.state.foto} />
        <Text>{this.state.nombre} </Text>
        <Text>{this.state.codigo} </Text>
        <Text>{this.state.centro} </Text>

        <TouchableOpacity onPress={this.toggleOpen} >
        <Text>Close</Text>
      </TouchableOpacity>
      </View>

      </View>
      
      


    );
  };

  componentDidMount(){
    
    

    
      var xhttp2= new XMLHttpRequest();
      let _this=this;
      
            xhttp2.onreadystatechange=function(){
              if(this.readyState==4 && this.status==200){
                
                console.log(xhttp2.responseText);
                _this.setState({runners: xhttp2.responseText} );
                
                

              }

            };
            console.log(xhttp2.responseText);
            
            xhttp2.open("GET","http://prograinternet.bare-technology.com.mx/numberoffiles.php");
                xhttp2.send();
                console.log("http://prograinternet.bare-technology.com.mx/numberoffiles.php");

        

    

    
    
  }

  
  
  

  render() {

    const navigation = this.context;

    const MAPA = () =>{ 
      
      navigation.navigate('Mapa');
      } 

    const RANKING = () =>{ 
      
        navigation.navigate('Ranking');
        } 

    
      
    
    return (
      
      <View >
           

      <View style={styles.textRunners}  >
      <Text> Numero corredores: {this.state.runners}  </Text>
      </View>

      

        <View >
        <MenuDrawer
          open={this.state.open}
          position={'left'}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text>Open</Text>
          </TouchableOpacity>
        </MenuDrawer>
        </View>
        <View  style={styles.btn1}>
        <Button
       
        title="Mapa"
        onPress={MAPA} />
        </View>
        <View  style={styles.btn2}>
        <Button
       
        title="Ranking"
        onPress={RANKING} />

        </View>
        

        
        
      
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    position:'absolute',
       top:30,
       left:0,
       width:'100%',
       backgroundColor:'#ffff',
       elevation:5,
       height:50,
       display:'flex',
       flexDirection:'row',
       paddingHorizontal:20,
       alignItems:'center',
       justifyContent:'space-between'
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 20
  },
  body: {
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812',
    marginTop:'-5.5%',
    paddingTop:'7%',
    paddingRight:'20%'
    
    
  },
  opendrawer:{
    
   
    
    backgroundColor: '#F04812',
    
    width:'50%',
    

  },
  textRunners:{
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative',
    

  },
  btn1:{ 
    
    top:'347%',
    width:'20%',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  
   
  
    
},
btn2: {
  //borderWidth:1, 
 
  
  //borderColor:"white", 
  top:'367%',
  width:'25%',
  justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
 
  
},
})
