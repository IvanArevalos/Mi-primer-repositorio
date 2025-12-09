import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Turno } from "../../interfaces/Turno";
import { obtenerTurno, editarTurno } from "../../servicios/turnoServicio";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type EditarTurnoProp = NativeStackNavigationProp<RootStackParamList, "EditarTurno">;
type EditarTurnoRouteProp = RouteProp<RootStackParamList, "EditarTurno">;

const EditarTurno = () => {
  const navigation = useNavigation<EditarTurnoProp>();
  const route = useRoute<EditarTurnoRouteProp>();
  const { id } = route.params;

  const [formulario, setFormulario] = useState<Turno | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarTurno = async () => {
      try {
        const datos = await obtenerTurno(id);
        setFormulario(datos);
      } catch (error) {
        console.log("Error al cargar el turno", error);
      } finally {
        setCargando(false);
      }
    };
    cargarTurno();
  }, [id]);

  const manejarCambio = (campo: keyof Turno, valor: string | boolean) => {
    if (!formulario) return;
    setFormulario({ ...formulario, [campo]: valor });
  };

  const enviarFormulario = async () => {
    if (!formulario) return;

    try {
      await editarTurno(id, formulario);
      Alert.alert("Éxito", "Turno editado con éxito");
      navigation.navigate("ListaTurnos");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Hubo un error al editar el turno");
    }
  };

  if (cargando || !formulario) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color="#4db6ac" />
        <Text>Cargando datos del turno...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Turno</Text>

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
        <Text style={{ color: "white", fontWeight: "bold" }}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cargandoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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

export default EditarTurno;
