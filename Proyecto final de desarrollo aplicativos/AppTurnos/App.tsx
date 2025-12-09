import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "./src/paginas/Inicio";
import ListaTurnos from "./src/paginas/Turnos/ListaTurnos";
import AgregarTurno from "./src/paginas/Turnos/AgregarTurno";
import EditarTurno from "./src/paginas/Turnos/EditarTurno";

export type RootStackParamList = {
  Inicio: undefined;
  ListaTurnos: undefined;
  AgregarTurno: undefined;
  EditarTurno: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: "#17a589" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: "Gestión de Turnos – Nutrición" }} />
        <Stack.Screen name="ListaTurnos" component={ListaTurnos} options={{ title: "Lista de Turnos" }} />
        <Stack.Screen name="AgregarTurno" component={AgregarTurno} options={{ title: "Crear Turno" }} />
        <Stack.Screen name="EditarTurno" component={EditarTurno} options={{ title: "Editar Turno" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}