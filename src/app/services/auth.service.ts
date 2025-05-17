import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(email: string, password: string, name: string): Promise<UserCredential> {
    const result = await createUserWithEmailAndPassword(this.auth, email, password);

    await setDoc(doc(this.firestore, 'Users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      nev: name,
      createdAt: serverTimestamp()
    });

    return result;
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}