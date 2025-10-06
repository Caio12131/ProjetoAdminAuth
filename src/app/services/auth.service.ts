import { Injectable } from "@angular/core"
import {
   Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  type User,
} from "@angular/fire/auth"
import type { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<User | null>

  constructor(private auth: Auth) {
    this.user$ = user(this.auth)
  }

  async register(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password)
      return result
    } catch (error) {
      throw error
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password)
      return result
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      await signOut(this.auth)
    } catch (error) {
      throw error
    }
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser
  }

  isAuthenticated(): boolean {
    return this.auth.currentUser !== null
  }
}
