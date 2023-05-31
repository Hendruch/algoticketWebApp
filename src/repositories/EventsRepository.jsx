import { db } from '../config/firebase-config';
import { getDoc, doc, getDocs, query, where, collection } from 'firebase/firestore';

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
}

export default new EventsRepository();