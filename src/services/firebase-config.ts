import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { CreateUser, UserData } from 'shared/interfaces/firestore-db';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersCollection = collection(db, import.meta.env.VITE_DB_NAME);

export async function getUsers(): Promise<UserData[]> {
  if (usersCollection.id !== import.meta.env.VITE_DB_NAME) {
    throw Error('colecao de dados nao existe!');
  }
  const data = await getDocs(usersCollection);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as UserData));
}

export async function createUser(userData: CreateUser) {
  await addDoc(usersCollection, userData);
}
