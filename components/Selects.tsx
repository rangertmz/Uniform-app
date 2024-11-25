import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "react-native-paper";

export const GenderSelect = ({ data, onSelect, value, disabled }:any) => (
  <SelectDropdown
    data={data}
    
    onSelect={onSelect}
    disabled={disabled}
    defaultValue={data.find((item: any) => item.value === value) || null}
    renderButton={(selectedItem, isOpened) => (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem && selectedItem.value) || "Sexo"}
        </Text>
        <Icon source={isOpened ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
      </View>
    )}
    renderItem={(item, index, isSelected) => (
      <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: "#0062D1" }) }}>
        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
      </View>
    )}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
);

export const SizeSelect = ({ data, onSelect, value, disabled }:any) => (
  <SelectDropdown
    data={data}
    onSelect={onSelect}
    disabled={disabled}
    defaultValue={data.find((item: any) => item.title === value) || null}
    renderButton={(selectedItem, isOpened) => (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem && selectedItem.value) || "Talla"}
        </Text>
        <Icon source={isOpened ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
      </View>
    )}
    renderItem={(item, index, isSelected) => (
      <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: "#0062D1" }) }}>
        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
      </View>
    )}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
);

export const ProviderSelect = ({ data, onSelect, value, disabled }:any) => (
  <SelectDropdown
    data={data}
    onSelect={onSelect}
    disabled={disabled}
    defaultValue={data.find((item: any) => item.title === value) || null}
    renderButton={(selectedItem, isOpened) => (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>
          {(selectedItem && selectedItem.title) || "Proveedor"}
        </Text>
        <Icon source={isOpened ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
      </View>
    )}
    renderItem={(item, index, isSelected) => (
      <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: "#0062D1" }) }}>
        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
      </View>
    )}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
);

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 171,
    height: 30,
    backgroundColor: "#0062D1",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  dropdownMenuStyle: {
    backgroundColor: "#0045A4",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
});
