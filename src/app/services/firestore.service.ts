import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from '@angular/fire/firestore';


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

  
  async lekerRendelesek(uid: string) {
    const ref = collection(this.firestore, 'Orders');
    const q = query(ref, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
  }

  async torolRendeles(rendelesId: string) {
    const ref = doc(this.firestore, 'Orders', rendelesId);
    return deleteDoc(ref);
  }

}
