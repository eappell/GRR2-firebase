import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireModule, AngularFire, FirebaseAuthState, FirebaseAuth } from 'angularfire2';
import { UserService } from '../services/user.service';
// import { emailMatcher } from '../../common/email.validator';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

function emailMatcher(c: AbstractControl) {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');
  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public loginForm: FormGroup;
  emailMessage: string;
  public authState: FirebaseAuthState;
  public isLoggedIn: boolean;

  private validationMessages = {
    required: 'Please enter an email address.',
    pattern: 'Please enter a valid email address.'
  };

  constructor(
            private af: AngularFire,
            private us: UserService,
            private router: Router,
            private fb: FormBuilder,
            @Inject(FirebaseAuth) public auth: FirebaseAuth) {
              this.us.isAuthenticated().subscribe(loggedIn => this.isLoggedIn = loggedIn);
            }

  ngOnInit() {
    this.signupForm = this.fb.group({
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+_]+@[a-z0-9.-]+')]],
        confirmEmail: ['', Validators.required]
      }, { validator: emailMatcher }),
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required] })
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    const emailControl = this.signupForm.get('emailGroup.email');
    emailControl.valueChanges.debounceTime(1000).subscribe (value => this.setMessage(emailControl));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' <br/>');
      console.log(this.emailMessage);
    }
  }

  signup() {
    let email = this.signupForm.get('emailGroup.email').value;
    let password = this.signupForm.get('passwordGroup.password').value;
    let authorized = this.us.signUp(email, password).then(response => {
          console.log('you\'re signed up!');
          console.log(response);
          this.router.navigate(['']);
        })
        .catch(error => console.log('SignUp Error', error));
  }

  login() {
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    this.us.login(email, password)
          .then(
            response => {
              if (response) {
                localStorage.setItem('refreshToken', response.auth.refreshToken);
                localStorage.setItem('uid', response.auth.uid);
                console.log('logged in successfully');
                this.router.navigate(['']);
              } else {
                console.log('NOT logged in');
              }
            }
          );
  }

  logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('uid');
    this.us.logout();
    this.router.navigate(['/signup']);
  }
}
