import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  IconButton,
  PaperProvider,
  Portal,
} from "react-native-paper";



export default function CardHome({ navigation, title, data, level }: any) {
  const [totalUniformes, setTotalUniformes] = useState(0);
  const [ultimaEntrada, setUltimaEntrada] = useState("00/00/00");
  
  
  useEffect(() => {
    if (data) {
      
      setTotalUniformes(data.totalUniformes || 0);
      if(data.ultimaEntrada){
        setUltimaEntrada(new Date(data.ultimaEntrada).toLocaleDateString());
      }else{
        setUltimaEntrada("00/00/00");
      }
    }
  }, [data]);

  return (
    <Card
      style={styles.cardBg}
      onPress={() => navigation.navigate("Primary", { level })}
    >
      <Card.Content>
        <Text style={styles.cardText}>Nivel: {title}</Text>
        <Text style={styles.cardText}>
          Total de Uniformes: {totalUniformes}
        </Text>
        <Text style={styles.cardText}>Ultima entrada: {ultimaEntrada} </Text>
      </Card.Content>
    </Card>
  );
}
const styles = StyleSheet.create({
  cardBg: {
    backgroundColor: "#95BEFE",
    padding: 5,
    marginTop: 15,
    marginEnd: 15,
    marginStart: 15,
  },
  cardText: {
    color: "#fff",
    marginBottom: 5,
  },
});
