import { Injectable } from '@angular/core';
import { Users } from '../model/users'
import { AngularFirestore } from '@angular/fire/compat/firestore'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }


  // Add Users
  addUser(user : Users) {
    user.id = this.afs.createId();
    return this.afs.collection('/Users').add(user)
  }

  // Get all Users
  getAllUsers() {
    return this.afs.collection('/Users').snapshotChanges();
  }

  // Delete Users
  deleteUser(user : Users) {
    return this.afs.doc('/Users/'+user.id ).delete();
  }

  // Update Users
  updateUser(user : Users) {
    this.deleteUser(user);
    this.addUser(user); 
  }

}
