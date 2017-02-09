import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseAuthState, FirebaseRef } from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class UsersService {
  public currentUser = this.auth.getAuth();
  constructor(
    @Inject(FirebaseAuth) private auth: FirebaseAuth,
    private af: AngularFire,
    private fbAuth: FirebaseAuth,
    private router: Router
  ) { }

  getUsers() {}

  getCurrentUser() {
    return this.currentUser.auth;
  }

  getUser(uid) {

  }

  addUser() {}

  updateUserEmail(email: string) {
    if(this.currentUser) {
      this.currentUser.auth.updateEmail(email)
            .then()
            .catch();
    }
  }

  editUser() {
    if(this.currentUser) {
      this.currentUser.auth.updateProfile({
        displayName: '',
        photoURL: ''
      })
      .then(function(){

      })
      .catch(function(error){

      });
    }
  }

  deleteUser(userId: string) {
    if(this.currentUser) {
      this.currentUser.auth.delete()
            .then()
            .catch();
    }
  }
}
