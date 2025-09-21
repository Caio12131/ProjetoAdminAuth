import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersRef;

  constructor(private firestore: Firestore) {
    this.usersRef = collection(this.firestore, 'usuarios');
  }

  listar() {
    return collectionData(this.usersRef, { idField: 'id' });
  }

  adicionar(usuario: any) {
    return addDoc(this.usersRef, usuario);
  }

  atualizar(id: string, usuario: any) {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return updateDoc(ref, usuario);
  }

  deletar(id: string) {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return deleteDoc(ref);
  }
}

