import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  HelperText,
  Icon,
  IconButton,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";

import {
  Tallas_Mujer,
  Tallas_Hombre,
  Genero,
  Proveedor,
} from "@/utils/constants";
import {
  emptyData,
  fetchUser,
  handleGeneroSelect,
  handleSubmit,
} from "@/utils/utils";
import { GenderSelect, SizeSelect, ProviderSelect } from "@/components/Selects";
import { set } from "react-native-reanimated";

interface Tallas {
  title: string;
  value: string;
}
export default function ModalInfo({ visible, onClose, level, data }: any) {
  const [selectedGenero, setSelectedGenero] = useState<string | null>(null);
  const [genero, setGenero] = useState<string>("");
  const [tallas, setTallas] = useState<Tallas[]>(Tallas_Mujer);
  const [proveedor, setProveedor] = useState<string>("");
  const [coste, setCoste] = useState<string>("");
  const [coste_total, setCoste_total] = useState<string>("");
  const [anotacion, setAnotacion] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [talla, setTalla] = useState<string>("");

  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const LevelTitle = (level: string) => {
    if (level === "Primary") {
      setTitle("Primaria");
    } else if (level === "Secondary") {
      setTitle("Secundaria");
    } else if (level === "Preparatory") {
      setTitle("Preparatoria");
    } else if (level === "University") {
      setTitle("Universidad");
    } else if (level === "Sports") {
      setTitle("Deportes");
    } else if (level === "Teachers") {
      setTitle("Profesores");
    }
  };
  

  useEffect(() => {
    if (data) {
      LevelTitle(data.level);
      setUser(data.user);
      setDate(new Date(data.fecha_registro).toLocaleDateString());
      setTotal(data.totalUniformes.toString());
      setCoste(data.coste.toString());
      setCoste_total(data.coste_total.toString());
      setAnotacion(data.anotacion);
      setTalla(data.talla);
      setGenero(data.genero);
      setProveedor(data.proveedor);
      
      handleGeneroSelect(
        data.genero,
        setSelectedGenero,
        setTallas,
        Tallas_Hombre,
        Tallas_Mujer
      );
    }
  }, [data]);
  

  const handleCloseModal = () => {
    emptyData(
      setCoste,
      setCoste_total,
      setTotal,
      setProveedor,
      setAnotacion,
      setTalla,
      setSelectedGenero,
      setIsError,
      setError
    );
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCloseModal}
        dismissable={false}
        contentContainerStyle={styles.container}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <IconButton
            icon='arrow-left'
            iconColor='#95BEFE'
            size={33}
            onPress={handleCloseModal}
            style={styles.icon}
          />
          <Text style={styles.title}>
            Nivel: {title} - Fecha: {date}
          </Text>
        </View>
        <Text style={{ color: "#fff", textAlign: "center", marginBottom: 5 }}>
          Registrado por: {user}
        </Text>
        <HelperText
          style={{ textAlign: "center" }}
          type='error'
          visible={isError}
        >
          {error}
        </HelperText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff", marginTop: 5, marginRight: 60 }}>
            Genero:
          </Text>
          <GenderSelect
            data={Genero}
            value={genero}
            disabled={true}
            onSelect={(selectedItem: any) =>
              handleGeneroSelect(
                selectedItem,
                setSelectedGenero,
                setTallas,
                Tallas_Hombre,
                Tallas_Mujer
              )
            }
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={{ color: "#fff", marginTop: 5, marginRight: 20 }}>
            Primaria - Talla:
          </Text>
          <SizeSelect
            data={tallas}
            value={talla}
            disabled={true}
            onSelect={(selectedItem: any) => setTalla(selectedItem.title)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", marginTop: 5 }}>
            Total de uniformes:
          </Text>
          <TextInput
            style={styles.input}
            underlineColor='transparent'
            cursorColor='#fff'
            activeUnderlineColor='transparent'
            placeholder='0'
            keyboardType='numeric'
            textColor='#fff'
            value={total}
            disabled={true}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", marginTop: 5, marginRight: 40 }}>
            Proveedor:
          </Text>
          <ProviderSelect
            data={Proveedor}
            value={proveedor}
            disabled={true}
            onSelect={(selectedItem: any) => setProveedor(selectedItem.title)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", marginTop: 5 }}>Coste por unidad:</Text>
          <TextInput
            style={styles.input}
            underlineColor='transparent'
            cursorColor='#fff'
            activeUnderlineColor='transparent'
            placeholder='0'
            keyboardType='numeric'
            textColor='#fff'
            value={coste}
            disabled={true}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", marginTop: 5, marginRight: 10 }}>
            Coste por total:
          </Text>
          <TextInput
            style={styles.input}
            underlineColor='transparent'
            cursorColor='#fff'
            activeUnderlineColor='transparent'
            placeholder='0'
            keyboardType='numeric'
            textColor='#fff'
            value={coste_total}
            disabled={true}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 5 }}>
          <Text style={{ color: "#fff", marginBottom: 5 }}>Anotación:</Text>
          <TextInput
            style={styles.input2}
            underlineColor='transparent'
            multiline={true}
            cursorColor='#000'
            textColor='#000'
            activeUnderlineColor='transparent'
            value={anotacion}
            disabled={true}
          />
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0045A4",
    padding: 5,
    margin: 15,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#0062D1",
    color: "#fff",
    height: 40,
    width: "auto",
    textAlign: "center",
    borderRadius: 10,
    fontSize: 17,
    padding: 10,
    marginTop: 10,
    marginLeft: -25,
  },
  icon: {
    marginLeft: -20,
  },

  input: {
    width: 171,
    height: 30,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "#0062D1",
    color: "#fff",
    fontSize: 16,
  },
  input2: {
    width: 293,
    height: 97,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: "#0062D1",
    borderWidth: 8,
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
  },
});
