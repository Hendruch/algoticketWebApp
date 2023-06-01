import { db } from '../config/firebase-config';
import { getDoc, doc, getDocs, query, where, collection, addDoc } from 'firebase/firestore';

// Función para obtener el nombre del mes en formato abreviado
const getMonthAbbreviation = (monthIndex) => {
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  return months[monthIndex];
};

// Función para formatear la hora en formato 'HH:mm hrs'
const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} hrs`;
};

// Función para formatear el día en formato de dos dígitos
const formatDay = (day) => {
  return day.toString().padStart(2, '0');
};

class EventsRepository {
  async getEvents(eventId){
    const eventDocRef = doc(db, 'evento', eventId);
    const eventDoc = await getDoc(eventDocRef);
    if (eventDoc.exists()) {
    const eventData = eventDoc.data();

    const lugarId = eventData.lugarId._key.path.segments[6];

    const date = eventData.fecha.toDate();
    const monthAbbreviation = getMonthAbbreviation(date.getMonth());
    const day = formatDay(date.getDate());
    const time = formatTime(date);
    const servicios = eventData.servicios.join(',');
  
    const lugarDocRef = doc(db, 'lugar', lugarId);
    const lugarDoc = await getDoc(lugarDocRef);
    if (lugarDoc.exists()) {
      const lugarData = lugarDoc.data();
      return {
        ...eventData,
        lugar: lugarData,
        mes: monthAbbreviation,
        day: day,
        time:time,
        services:servicios
      };
    } else {
      throw new Error('El documento en la colección "lugar" no existe.');
    }

    } else {
      throw new Error('El evento no existe.');
    }
  }

  async getSections(seccion, eventoId){

    const referencia = doc(db, 'evento', eventoId);
    const sectionsCollectionRef = collection(db, 'seccion');
    const querySnapshot = await getDocs(query(
      sectionsCollectionRef,
      where('seccion', '==', seccion),
      where('eventoId', '==', referencia),
    ));
  
    const sections = [];
  
    await Promise.all(querySnapshot.docs.map(async (doc) => {
      const sectionData = doc.data();
      const sectionWithReferences = {
        id: doc.id,
        ...sectionData,
        rango_asientos: [], // Array to hold objects referenced in 'rango_asientos'
      };
  
      const references = sectionData.rango_asientos || [];
  
      const referencePromises = references.map((reference) => getDoc(reference));
      const referenceSnapshots = await Promise.all(referencePromises);
  
      referenceSnapshots.forEach((referenceSnapshot) => {
        if (referenceSnapshot.exists()) {
          sectionWithReferences.rango_asientos.push(referenceSnapshot.data());
        }
      });
  
      sections.push(sectionWithReferences);
    }));
  
    return sections;
  

  }
  async getSeatsBySections(seccion, seccion_num, eventoId){

    const referencia = doc(db, 'evento', eventoId);
    const sectionsCollectionRef = collection(db, 'seccion');
    const querySnapshot = await getDocs(query(
      sectionsCollectionRef,
      where('seccion', '==', seccion),
      where('seccion_num', '==', seccion_num),
      where('eventoId', '==', referencia),
    ));

    const sections = [];

    await Promise.all(querySnapshot.docs.map(async (doc) => {
      const sectionData = doc.data();
      const sectionWithReferences = {
        id: doc.id,
        ...sectionData,
        rango_asientos: [], // Array para contener los objetos referenciados en 'rango_asientos'
      };

      const references = sectionData.rango_asientos || [];

      const referencePromises = references.map(async (reference) => {
        const referenceDoc = await getDoc(reference);
        return { id: reference.id, ...referenceDoc.data() }; // Agregar el ID del documento en cada objeto del array 'rango_asientos'
      });
      
      const referenceSnapshots = await Promise.all(referencePromises);

      sectionWithReferences.rango_asientos = referenceSnapshots;

      sections.push(sectionWithReferences);
    }));

    return sections;
  }

  async getAllEvents(){
    const eventsCollectionRef = collection(db, 'evento');
    const eventsQuerySnapshot = await getDocs(eventsCollectionRef);

    const events = [];
  
    for (const docSnap of eventsQuerySnapshot.docs) {
      const eventId = docSnap.id;
      const eventData = docSnap.data();
  
      const lugarId = eventData.lugarId._key.path.segments[6];
  
      const date = eventData.fecha.toDate();
      const monthAbbreviation = getMonthAbbreviation(date.getMonth());
      const day = formatDay(date.getDate());
      const time = formatTime(date);
      const servicios = eventData.servicios.join(',');
  
      const lugarDocRef = doc(db, 'lugar', lugarId);
      const lugarDoc = await getDoc(lugarDocRef);
  
      if (lugarDoc.exists()) {
        const lugarData = lugarDoc.data();
        const event = {
          id: eventId,
          ...eventData,
          lugar: lugarData,
          mes: monthAbbreviation,
          day: day,
          time: time,
          services: servicios,
        };
        events.push(event);
      } else {
        throw new Error('El documento en la colección "lugar" no existe.');
      }
    }
  
    return events;
  }
  async getCarritoInfo(eventoId, asiento, seccion){
    const result = [];

  // Obtener el artista del evento
  const eventoRef = doc(db, 'evento', eventoId);
  const eventoDoc = await getDoc(eventoRef);

  if (!eventoDoc.exists()) {
    throw new Error('No se encontró el evento');
  }

  const eventoData = eventoDoc.data();
  const artista = eventoData.artista;
  result.push(artista);

  // Obtener el precio y el ID de la sección
  const seccionLetra = seccion.charAt(0);
  const seccionNumero = parseInt(seccion.substring(1));

  const seccionesCollectionRef = collection(db, 'seccion');
  const querySnapshot = await getDocs(query(
    seccionesCollectionRef,
    where('eventoId', '==', eventoRef),
    where('seccion', '==', seccionLetra),
    where('seccion_num', '==', seccionNumero)
  ));

  if (querySnapshot.empty) {
    throw new Error('No se encontró la sección en el evento');
  }

  const seccionDoc = querySnapshot.docs[0];
  const seccionData = seccionDoc.data();
  const precio = seccionData.precio;
  const seccionId = seccionDoc.id;
  result.push(precio, seccionId);

  // Obtener información del asiento
  const asientosCollectionRef = collection(db, 'asiento');
  const asientoDoc = await getDoc(doc(asientosCollectionRef, asiento));

  if (!asientoDoc.exists()) {
    throw new Error('No se encontró el asiento');
  }

  const asientoData = asientoDoc.data();
  const fila = asientoData.fila;
  const numeroAsiento = asientoData.numero_asiento;

  result.push(fila, numeroAsiento);

  return result;

}
async postCarrito(asientoId, estatus, eventoId, seccionId, usuarioId){
  

    const seccionCollection = collection(db, "boleto");

    // Crea un nuevo objeto con los datos del carrito
    const nuevoCarrito = {
      asientos: asientoId,
      estatus: estatus,
      evento: eventoId,
      id_seccion: seccionId,
      usuario: usuarioId,
    };
    
    try {
    await addDoc(seccionCollection, nuevoCarrito);
  } catch (error) {
    console.error(error);
  }
 
}
}

export default new EventsRepository();