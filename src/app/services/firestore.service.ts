import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async ujRendeles(adat: { uid: string; csomagId: number; cim: string }) {
    const rendelesRef = collection(this.firestore, 'Orders');
    return await addDoc(rendelesRef, {
      ...adat,
      timestamp: serverTimestamp()
    });
  }
}
