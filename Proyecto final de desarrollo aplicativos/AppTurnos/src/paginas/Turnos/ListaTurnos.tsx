import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Turno } from "../../interfaces/Turno";
import { obtenerTurnos, borrarTurno } from "../../servicios/turnoServicio";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type ListaTurnosProp = NativeStackNavigationProp<RootStackParamList, "ListaTurnos">;

const ListaTurnos = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroTelefono, setFiltroTelefono] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroHora, setFiltroHora] = useState("");

  const navigation = useNavigation<ListaTurnosProp>();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerTurnos();
        setTurnos(datos);
      } catch (error) {
        console.log("Error al cargar turnos", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const manejarEliminar = (id: string) => {
    Alert.alert(
      "Confirmar",
      "¿Seguro que querés eliminar este turno?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await borrarTurno(id);
              setTurnos((prev) => prev.filter((t) => t.id !== id));
              Alert.alert("Turno eliminado con éxito");
            } catch (error) {
              Alert.alert("Error eliminando el turno");
            }
          },
        },
      ]
    );
  };

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroTelefono("");
    setFiltroFecha("");
    setFiltroHora("");
    setBusqueda("");
  };

  const turnosFiltrados = turnos.filter((t) => {
    const texto = busqueda.toLowerCase();
    const coincideNombre = filtroNombre === "" || t.nombrePaciente.toLowerCase().includes(filtroNombre);
    const coincideTelefono = filtroTelefono === "" || t.telefono.toLowerCase().includes(filtroTelefono);
    const coincideFecha = filtroFecha === "" || t.fecha === filtroFecha;
    const coincideHora = filtroHora === "" || t.hora === filtroHora;
    const coincideBusquedaGlobal =
      texto === "" ||
      t.nombrePaciente.toLowerCase().includes(texto) ||
      t.telefono.toLowerCase().includes(texto) ||
      t.fecha.includes(texto) ||
      t.hora.includes(texto);
    return coincideNombre && coincideTelefono && coincideFecha && coincideHora && coincideBusquedaGlobal;
  });

  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4db6ac" />
        <Text>Cargando turnos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listado de Turnos</Text>

      <TextInput
        style={styles.inputBusqueda}
        placeholder="Buscar por nombre, fecha, hora o teléfono..."
        value={busqueda}
        onChangeText={(text) => setBusqueda(text.toLowerCase())}
      />

      <View style={styles.filtrosCard}>
        <Text style={styles.subtitulo}>Filtros avanzados</Text>

        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por nombre"
          value={filtroNombre}
          onChangeText={(text) => setFiltroNombre(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por teléfono"
          value={filtroTelefono}
          onChangeText={(text) => setFiltroTelefono(text.toLowerCase())}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por fecha (YYYY-MM-DD)"
          value={filtroFecha}
          onChangeText={setFiltroFecha}
        />
        <TextInput
          style={styles.filtroInput}
          placeholder="Filtrar por hora (HH:MM)"
          value={filtroHora}
          onChangeText={setFiltroHora}
        />

        <TouchableOpacity style={styles.btnLimpiar} onPress={limpiarFiltros}>
          <Text>Limpiar filtros</Text>
        </TouchableOpacity>
      </View>

      {turnosFiltrados.length === 0 ? (
        <Text>No hay turnos cargados.</Text>
      ) : (
        <FlatList
          data={turnosFiltrados}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.nombre}>{item.nombrePaciente}</Text>
              <Text>{item.fecha} {item.hora}</Text>
              <View style={styles.botonera}>
                <TouchableOpacity
                  style={styles.botonEditar}
                  onPress={() => navigation.navigate("EditarTurno", { id: item.id! })}
                >
                  <Text style={{ color: "white" }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonEliminar}
                  onPress={() => manejarEliminar(item.id!)}
                >
                  <Text style={{ color: "white" }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f9f9",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  inputBusqueda: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  filtrosCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filtroInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  btnLimpiar: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    borderRadius: 10,
  },
  tarjeta: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: "#4db6ac",
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
  },
  botonera: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  botonEditar: {
    backgroundColor: "#4db6ac",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  botonEliminar: {
    backgroundColor: "#e57373",
    padding: 8,
    borderRadius: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListaTurnos;