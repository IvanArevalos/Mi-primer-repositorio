import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type InicioScreenProp = NativeStackNavigationProp<RootStackParamList, "Inicio">;

const Inicio = () => {
  const navigation = useNavigation<InicioScreenProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Panel Principal</Text>

      <View style={styles.contenedor}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ListaTurnos")}
        >
          <Text style={styles.icono}>📋</Text>
          <Text style={styles.tituloCard}>Lista de turnos</Text>
          <Text style={styles.descripcion}>Ver todos los turnos registrados.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AgregarTurno")}
        >
          <Text style={styles.icono}>➕</Text>
          <Text style={styles.tituloCard}>Crear turno</Text>
          <Text style={styles.descripcion}>Registrar un nuevo turno.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f9f9",
    padding: 20,
  },
  titulo: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  contenedor: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 25,
  },
  card: {
    width: 230,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  icono: {
    fontSize: 45,
    marginBottom: 10,
  },
  tituloCard: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  descripcion: {
    textAlign: "center",
    marginTop: 5,
    color: "#333",
  },
});

export default Inicio;