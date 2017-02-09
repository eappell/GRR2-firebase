import { Injectable }             from '@angular/core';
import { CanActivate, Router, ActivatedRoute,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserService }            from './user.service';
import {Observable}               from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: UserService,
              public af: AngularFire,
              private router: Router,
              private route: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.auth.isAuthenticated().map((auth) => {
          if (!auth) {
            // console.log('not authenticated!');
            this.router.navigate(['/signup']);
            return false;
          }
          // console.log('authenticated!');
          return true;
      }).take(1);
    }
}
