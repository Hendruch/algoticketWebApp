import { db } from '../config/firebase-config';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

class EventsRepository {
  async getEvents(eventId){
    // const eventsCollection = collection(db,'evento');
    // const snapshot = await getDocs(eventsCollection);
    // return snapshot.docs.map((doc) => doc.data());
    const userDocRef = doc(db, 'evento', eventId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('El usuario no existe.');
    }
  }
}

export default new EventsRepository();