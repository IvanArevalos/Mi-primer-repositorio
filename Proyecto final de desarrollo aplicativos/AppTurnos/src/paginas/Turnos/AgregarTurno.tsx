import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Turno } from "../../interfaces/Turno";
import { crearTurno } from "../../servicios/turnoServicio";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type CrearTurnoProp = NativeStackNavigationProp<RootStackParamList, "AgregarTurno">;

const CrearTurno = () => {
  const navigation = useNavigation<CrearTurnoProp>();

  const [formulario, setFormulario] = useState<Turno>({
    nombrePaciente: "",
    fecha: "",
    hora: "",
    motivo: "",
    telefono: "",
    recordatorio: false,
  });

  const manejarCambio = (campo: keyof Turno, valor: string | boolean) => {
    setFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const enviarFormulario = async () => {
    if (!formulario.nombrePaciente || !formulario.fecha || !formulario.hora) {
      Alert.alert("Error", "Nombre, fecha y hora son obligatorios");
      return;
    }

    try {
      await crearTurno(formulario);
      Alert.alert("Éxito", "Turno creado con éxito");
      navigation.navigate("ListaTurnos");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Hubo un error al crear el turno");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Crear Turno</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del paciente"
        value={formulario.nombrePaciente}
        onChangeText={(text) => manejarCambio("nombrePaciente", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={formulario.fecha}
        onChangeText={(text) => manejarCambio("fecha", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={formulario.hora}
        onChangeText={(text) => manejarCambio("hora", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Motivo del turno"
        value={formulario.motivo}
        onChangeText={(text) => manejarCambio("motivo", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={formulario.telefono}
        onChangeText={(text) => manejarCambio("telefono", text)}
      />

      <View style={styles.switchContainer}>
        <Text>Enviar recordatorio</Text>
        <Switch
          value={formulario.recordatorio}
          onValueChange={(value) => manejarCambio("recordatorio", value)}
        />
      </View>

      <TouchableOpacity style={styles.boton} onPress={enviarFormulario}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Guardar Turno</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f9f9",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#4db6ac",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default CrearTurno;
