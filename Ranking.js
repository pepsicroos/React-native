import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
        codigo1:'',
        distancia1:'',
        tiempo1:'',
        codigo2:'',
        distancia2:'',
        tiempo2:'',
        codigo3:'',
        distancia3:'',
        tiempo3:'',
    };
  }

  Top3 =async() =>{
    var xhttp2= new XMLHttpRequest();
    let _this=this;

    xhttp2.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        console.log(xhttp2.responseText);
        var datosMejores=xhttp2.responseText;
        var filasDatosmejores= datosMejores.split('<br>');

        var datos=filasDatosmejores[0].split(',');
        _this.setState({codigo1:datos[0]});
        _this.setState({distancia1:datos[1]});
        _this.setState({tiempo1:datos[2]});

        var datos2=filasDatosmejores[1].split(',');
        _this.setState({codigo2:datos2[0]});
        _this.setState({distancia2:datos2[1]});
        _this.setState({tiempo2:datos2[2]});
       
        var datos3=filasDatosmejores[2].split(',');
        _this.setState({codigo3:datos3[0]});
        _this.setState({distancia3:datos3[1]});
        _this.setState({tiempo3:datos3[2]});
        
        
        

      }
    }
    
    xhttp2.open("GET","http://prograinternet.bare-technology.com.mx/Ranking.php", true);
        console.log("http://prograinternet.bare-technology.com.mx/Ranking.php");
        xhttp2.send();
        

  }


  componentDidMount(){

      this.Top3()
  }

  render() {
    return (
      <View>
        <Text> Ranking </Text>
        <DataTable>
        <DataTable.Header>
        <DataTable.Title>Numero</DataTable.Title>
          <DataTable.Title>Codigo</DataTable.Title>
          <DataTable.Title>Distancia</DataTable.Title>
          <DataTable.Title >Tiempo</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
        <DataTable.Cell>1</DataTable.Cell>
          <DataTable.Cell>{this.state.codigo1}</DataTable.Cell>
          <DataTable.Cell>{this.state.distancia1} km</DataTable.Cell>
          <DataTable.Cell >{this.state.tiempo1} min</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
        <DataTable.Cell>2</DataTable.Cell>
          <DataTable.Cell> {this.state.codigo2} </DataTable.Cell>
          <DataTable.Cell>{this.state.distancia2} km</DataTable.Cell>
          <DataTable.Cell >{this.state.tiempo2} min</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>3</DataTable.Cell>
          <DataTable.Cell>{this.state.codigo3}</DataTable.Cell>
          <DataTable.Cell>{this.state.distancia3} km </DataTable.Cell>
          <DataTable.Cell>{this.state.tiempo3} min</DataTable.Cell>
        </DataTable.Row>

      </DataTable>





        
      </View>
    );
  }
}
