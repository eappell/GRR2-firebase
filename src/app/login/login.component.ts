import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    @Input() returnRoute: string;
    model: any = {};
    loading = false;
    redirect: string;

    constructor(
        private router: Router,
        // private routerLink: RouterLink,
        private userService: UserService,
        private route: ActivatedRoute,
        public activeModal: NgbActiveModal) { }

    ngOnInit() {
      // reset login status
      // this.redirect = localStorage.getItem('lastRoute');
      this.redirect = this.route.snapshot.params['redirect'];
      this.userService.logout();
    }

    login() {
      this.loading = true;
      this.userService
          .login(this.model.username, this.model.password)
          .then(
            () => this.loginSuccess(),
            error => this.loginFail(error)
          );
    }

    loginSuccess(): void {      
      if (this.redirect) {
        this.activeModal.dismiss();
        this.router.navigateByUrl(this.redirect);
      } else {
        this.activeModal.dismiss();
        // this.router.navigate(['/']);
      }
    }

    loginFail(error): void {
      this.loading = false;
      alert(error.message);
      // this.activeModal.dismiss();
      this.loading = false;
    }
}
