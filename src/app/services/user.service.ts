import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseAuthState, FirebaseRef } from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class UserService {
  public authState: FirebaseAuthState;

  constructor(
    @Inject(FirebaseAuth) private auth: FirebaseAuth,
    private af: AngularFire,
    private router: Router
    ) { }

  isAuthenticated(): Observable<boolean> {
    return this.auth.map((auth) => {
      if (!auth) {
        this.router.navigate(['/signup']);
        return false;
      }
      return true;
    }).take(1);
  }

  signUp(email: string, password: string): Promise<any> {
    let creds: any = { email: email, password: password };
    let res: Promise<boolean> = new Promise((resolve, reject) => {
      this.auth.createUser(creds)
        .then(authState => {
          resolve(authState);
        })
        .catch(error => {
          reject(error);
        });
    });

    return res;
  }

  login(email: string, password: string): Promise<FirebaseAuthState> {
    let creds: any = { email: email, password: password };
    let res: Promise<FirebaseAuthState> = new Promise((resolve, reject) => {
      this.auth.login(creds)
        .then(
        result => resolve(result),
        error => reject(error)
        );
    });
    return res;
  }

  logout() {
    this.auth.logout();
  }
}
