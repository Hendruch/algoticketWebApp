import { db } from '../config/firebase-config';
import { getDoc, doc } from 'firebase/firestore';

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
  
    console.log(lugarId);
    const lugarDocRef = doc(db, 'lugar', lugarId);
    const lugarDoc = await getDoc(lugarDocRef);
    if (lugarDoc.exists()) {
      const lugarData = lugarDoc.data();
      return {
        ...eventData,
        lugar: lugarData,
        mes: monthAbbreviation,
        day: day,
        time:time
      };
    } else {
      throw new Error('El documento en la colección "lugar" no existe.');
    }

    } else {
      throw new Error('El usuario no existe.');
    }
  }
}

export default new EventsRepository();