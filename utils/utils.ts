// utils.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUniforms } from "@/requests/database";
import { validateFields } from "@/hooks/validate";

export const fetchUser = async (setUser: any, setToken: any) => {
  const data = await AsyncStorage.getItem("user");
  const tkn = await AsyncStorage.getItem("token");
  
  if (data !== null) {
    setUser(data);
  }
  if (tkn !== null) {
    setToken(tkn);
  }
};

export const handleGeneroSelect = (item: any, setSelectedGenero: any, setTallas: any, Tallas_Hombre: any, Tallas_Mujer: any) => {
  setSelectedGenero(item.value);
  setTallas(item.value === "Masculino" ? Tallas_Hombre : Tallas_Mujer);
};

export const emptyData = (setCoste: any, setCoste_total: any, setTotal: any, setProveedor: any, setAnotacion: any, setTalla: any, setSelectedGenero: any, setIsError: any, setError: any) => {
  setCoste("");
  setCoste_total("");
  setTotal("");
  setProveedor("");
  setAnotacion("");
  setTalla("");
  setSelectedGenero(null);
  setIsError(false);
  setError("");
};

export const handleSubmit = async (
  data: any,
  token: string,
  date: string,
  fetchData: any,
  onClose: any,
  emptyData: any,
  setIsError: any,
  setError: any,
  level:any
) => {
  const { valid, errors } = validateFields(data);
  if (!valid) {
    setIsError(true);
    setError(errors[0]);
    return;
  }

  try {
    await createUniforms(level,token, {
      ...data,
      total: Number(data.total),
      coste: Number(data.coste),
      coste_total: Number(data.coste_total),
      fecha_registro: date,
      ultima_entrada: date,
    });
  } catch (e) {
    console.log(e);
  } finally {
    fetchData();
    onClose();
    emptyData();
  }
};
