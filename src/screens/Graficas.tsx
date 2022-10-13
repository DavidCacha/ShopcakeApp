import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useSales } from '../hooks/useSales';
const screenWidth = Dimensions.get("window").width;



const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `#850642`,
  
  strokeWidth: 3, // optional, default 3
  useShadowColorFromDataset: false // optional
};

export const Graficas = () => {

  var NewArray = [0,5]

  const [pedido, setPedido] = useState<Number>();

  const {saleAll,sale,getSale , filterByStatus} = useSales();

  useEffect(()=>{
    getSale();
   

  },[])
  NewArray[2] = sale.length

  var data = {
    labels: ["Sin pagar", "Enviado", "Entregado"],
    datasets: [
      {
        data: NewArray
      }
    ]
  };
  return (
    <>
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Text style={{color:'#850642', paddingVertical:15, fontSize:25, fontWeight:'600'}}>Grafica de pedidos en el mes</Text>
    </View>
    <BarChart
      yAxisSuffix=''
      withVerticalLabels={true}
      //style={graphStyle}
      data={data}
      width={screenWidth}
      height={420}
      
      yAxisLabel=""
      chartConfig={chartConfig}
      verticalLabelRotation={30}
    />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    height:'100%'
  }
});