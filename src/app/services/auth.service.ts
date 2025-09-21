import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, senha: string) {
    return this.afAuth.signInWithEmailAndPassword(email, senha);
  }

  logout() {
    return this.afAuth.signOut();
  }

  currentUser() {
    return this.afAuth.authState; // Observable
  }
}
