import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {FirebaseAuth} from 'angularfire2';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loginModal: LoginComponent;

  constructor(
    private modalService: NgbModal, 
    private userService: UserService,
    private router: Router,
    @Inject(FirebaseAuth) public auth: FirebaseAuth
  ) {}

  openLogin(): void {
    this.modalService.open(LoginComponent, { size: 'sm' }).result.then((result) => {
      console.log(result);
    }, (reason) => {
      this.getDismissReason(reason);
    });
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.userService.logout();
      this.router.navigate(['/signup']);
    }
  }

  ngOnInit() {
  }

  private getDismissReason(reason: any): boolean {
    console.log(reason);
    // if (reason === ModalDismissReasons.ESC) {
    //   return 'by pressing ESC';
    // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //   return 'by clicking on a backdrop';
    // } else {
    //   return  `with: ${reason}`;
    // }
    return true;
  }
}
