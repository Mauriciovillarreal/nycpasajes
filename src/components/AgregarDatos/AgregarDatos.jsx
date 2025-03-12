// AgregarDatos.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/config";

// Función para agregar datos a Firebase
export const AgregarDatos = async (datos) => {
  try {
    // Obtén la referencia a la colección en la base de datos de Firebase
    const datosRef = collection(db, "viajes");

    // Agrega el nuevo documento
    const docRef = await addDoc(datosRef, {
      ...datos
    });

    console.log("Documento agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
  }
};
