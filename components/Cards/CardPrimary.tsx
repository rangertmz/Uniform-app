import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Icon, IconButton } from "react-native-paper";

export default function CardPrimary({ navigation, data, level, onPress }: any) {
  const [nivel, setNivel] = useState("");
  
  const LevelTitle = () => {
    switch (level) {
      case "Primary":
        setNivel("Primaria");
        break;
      case "Secondary":
        setNivel("Secundaria");
        break;
      case "Preparatory":
        setNivel("Preparatoria");
        break;
      case "University":
        setNivel("Universidad");
        break;
      case "Sports":
        setNivel("Deportes");
        break;
      case "Teachers":
        setNivel("Profesores");
        break;
      default:
        setNivel("Desconocido");
    }
  };
  const [ultimaEntrada, setUltimaEntrada] = useState("00/00/00");
  useEffect(() => {
    if (data) {
      setUltimaEntrada(new Date(data.ultimaEntrada).toLocaleDateString());
    }
    LevelTitle();
  }, [data]);

  return (
    <Card onPress={onPress} style={styles.cardBg}>
      <Card.Content>
        <Text style={styles.cardText}>
          {nivel} - Talla {data.talla} {data.genero}
        </Text>
        <Text style={styles.cardText}>
          Total de Uniformes: {data.totalUniformes}
        </Text>
        <Text style={styles.cardText}>Ultima entrada: {ultimaEntrada}</Text>
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
