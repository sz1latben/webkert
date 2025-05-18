import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { updatePassword as firebaseUpdatePassword } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  private currentUser: User | null = null;

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user;
    });
  }

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
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    this.currentUser = result.user;
    return result;
  }

  logout() {
    this.currentUser = null;
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUserEmail(): string {
    return this.currentUser?.email ?? '';
  }

  getUid(): string | null {
    return this.currentUser?.uid ?? null;
  }

  async updatePassword(newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      await firebaseUpdatePassword(user, newPassword);
    } else {
      throw new Error('Felhasználó nincs bejelentkezve');
    }
  }
}
