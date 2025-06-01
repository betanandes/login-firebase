import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addEmail(email: string) {
    const emailsRef = collection(this.firestore, 'emails');
    return addDoc(emailsRef, { email });
  }

  getEmails(): Observable<any[]> {
    const emailsRef = collection(this.firestore, 'emails');
    return collectionData(emailsRef, { idField: 'id' }) as Observable<any[]>;
  }

  deleteEmail(emailId: string) {
    const emailDoc = doc(this.firestore, 'emails', emailId);
    return deleteDoc(emailDoc);
  }
}
