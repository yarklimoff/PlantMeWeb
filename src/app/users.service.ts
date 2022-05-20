import { Injectable } from '@angular/core';
import {doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {UserProfile} from "./models/user-profile";
import {from, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<UserProfile | null> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid)
        return docData(ref) as Observable<UserProfile>;
      })
    )
  }

  constructor(private firestore: Firestore) { }

  addUser(user: UserProfile) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: UserProfile) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
