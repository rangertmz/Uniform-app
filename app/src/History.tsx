import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { PaperProvider, Portal, Searchbar } from "react-native-paper";
import CardPrimary from "@/components/Cards/CardPrimary";
import { getAllUniforms } from "@/requests/database";
import SkeletonCard from "@/components/Skeleton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { set } from "react-native-reanimated";
import ModalInfo from "@/components/Modals/ModalInfo";

export default function History() {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#222" : "#fff",
    },
    searchInput: {
      backgroundColor: "#0062D1",
      margin: 15,
    },
  });
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [token, setToken] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };
  const handleOpen = (item: any) => () => {
    setOpen(true);
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const tkn = await AsyncStorage.getItem("token");
      if (tkn !== null) {
        setToken(tkn);
      }
    };
    fetchToken();
  }, []);
  const fetchData = async () => {
    try {
      const result = await getAllUniforms(token);

      setData(result || []);
      setFilteredData(result || []);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchData();
      }
    }, [token])
  );

  useEffect(() => {
    if (search) {
      const filtered = data.filter(
        (item: any) =>
          item.talla.toLowerCase().includes(search.toLowerCase()) ||
          item.genero.toLowerCase().includes(search.toLowerCase()) ||
          item.level.toLowerCase().includes(search.toLowerCase()) ||
          item.totalUniformes.toString().includes(search.toString()) ||
          item.ultimaEntrada.toString().includes(search.toString())
      );

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [search, data]);

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <View>
          <Searchbar
            style={styles.searchInput}
            placeholder='Buscar Entrada'
            onChangeText={setSearch}
            value={search}
            iconColor='#fff'
            cursorColor={"#fff"}
            inputStyle={{ color: "#fff" }}
          />
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <>
              {filteredData.map((item: any, index: number) => (
                <CardPrimary
                  onPress={
                    handleOpen(item)
                  }
                  key={index}
                  data={item}
                  level={item.level}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
      <Portal>
        <ModalInfo visible={open}  onClose={handleClose} data={selectedItem} />
      </Portal>
    </PaperProvider>
  );
}
