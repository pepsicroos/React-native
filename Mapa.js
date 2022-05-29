import React, { Component } from 'react';
import { View, Text, PermissionsAndroid, Button, DevSettings } from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TURF from '@turf/distance';

import MapboxGL from '@react-native-mapbox-gl/maps';


MapboxGL.setAccessToken('sk.eyJ1IjoicGVwc2ljcm9vcyIsImEiOiJjbDJzaHY5bXowNW5rM2xwZGdkczBwZHk1In0.ycWvKBuGM32xKTP2Ioj5ug');


export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kilometros:0,
      codigo:'',
      x1:0,
      x2:0,
      y1:0,
      y2:0,
      distancia:'',
      

    };
  }


  datos_codigo =async() =>{

    var xhttp = new XMLHttpRequest();
    let _this = this;
    


  
      const jsonval2= await AsyncStorage.getItem('UDATA');
      var codigo=  JSON.parse(jsonval2);
      console.log("Valor guardado: "+codigo[0]);
      

    
    _this.setState({codigo:codigo[0]})
   
    
    
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        _this.setState({kilometros: xhttp.responseText});
        console.log(_this.state.kilometros);
      }
    };
    xhttp.open(
      'GET',
      'http://prograinternet.bare-technology.com.mx/Avance.php?codigo='+this.state.codigo,
      true,
    );
    xhttp.send();


  }

  onLocationUpdate = (e: any) => {
    //  this.onLocationUpdate(e);

    this.setState(
      {
        coordinates: [e.coords.longitude, e.coords.latitude],
      },
      () => {
        console.log(this.state.coordinates);
      },
    );
  };

  

    

  

 

   componentDidMount() {
     this.datos_codigo();
     
     
    

    
      
  }



  render()
   {

    const Permisos = async ()=> {
      try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "PERMISO LOCALIZACION",
              message:
                "PERIMISO LOCALIZACON " +
                "POSICION EN EL MAPA",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }

      }
      catch{

      }
      DevSettings.reload();
  }

  const DIBUJA = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  -103.325310353125,
                  20.6567183
                ],
                this.state.coordinates
              ]
            }
          }
        ]
      
    
    

  }

  const Calcula =() => {
    //this.setState({x1:this.state.coordinates[0]});
    //this.setState({y1:this.state.coordinates[1]});
    //this.setState({x2:-103.325310353125});
    //this.setState({x2:20.6567183});
    
   
   this.setState({distancia:TURF(this.state.coordinates,[-103.325310353125,20.6567183 ],'km')+' km'});
    this.state.distancia;
    
    

  



  }

  

  


  

  



    
    return (
      
        <View style={{flex: 1, height: "100%", width: "100%" }}>
          <Text style={{fontSize: 40, color: 'red', textAlign: 'center',marginBottom:20}}>
          Mi avance
        </Text>
        <View>
          <Button
          title='Calcular distancia'
          onPress={Calcula}
          />
        </View>
        <Text>Distancia: {this.state.distancia} </Text>
        <View style={{marginLeft: 200, width:120, height:100}}>
          <AnimatedCircularProgress
            arcSweepAngle={180}
            rotation={-90}
            size={120}
            width={15}
            fill={parseInt(this.state.kilometros)*10}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {fill => <Text style={{color:"black"}}> {this.state.kilometros} km  / 10 km</Text>}
          </AnimatedCircularProgress>
        </View>
        <View style={{marginTop: -100, marginLeft:50}}>
        <AnimatedCircularProgress
            arcSweepAngle={180}
            rotation={-90}
            size={120}
            width={15}
            fill={50}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {fill => <Text style={{color:"black"}}>3 dias / 5 dias</Text>}
          </AnimatedCircularProgress>
        </View>
        

      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={16}
centerCoordinate={[20.66611, -103.35607]}
        style={{flex: 1}}>
          

         


        
     
          <MapboxGL.UserLocation
              visible={true}
              onUpdate={this.onLocationUpdate}
              minDisplacement={3}

              
           />
           <MapboxGL.ShapeSource id='line1' shape={DIBUJA}>
           <MapboxGL.LineLayer id='linelayer1' style={{lineColor:'red'}} />
           </MapboxGL.ShapeSource>

           <MapboxGL.Camera
              zoomLevel={16}
              centerCoordinate={[3.3362400, 6.5790100]}
              animationMode={'flyTo'}
              animationDuration={0}
              followUserLocation={true}
          	>

    
          </MapboxGL.Camera>
          
      </MapboxGL.MapView>
      
    
    <Button title='Permisos' onPress={Permisos}></Button>

    </View>


      
    );
  }
}


