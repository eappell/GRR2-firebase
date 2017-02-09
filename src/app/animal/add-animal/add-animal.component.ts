import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { IAnimal, Animal } from '../../../common/model';

import 'rxjs/add/operator/debounceTime';

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

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    };
    return null;
  };
}

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  addAnimalForm: FormGroup;
  animal: IAnimal = new Animal();
  emailMessage: string;

  get addresses(): FormArray {
    return <FormArray>this.addAnimalForm.get('addresses');
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  private validationMessages = {
    required: 'Please enter an email address.',
    pattern: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addAnimalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      id: ['', [Validators.required, Validators.maxLength(20)]],
      description: '',
      notification: 'Email',
      dateAdded: new Date(),
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+_]+@[a-z0-9.-]+')]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      dob: '',
      rating: ['', ratingRange(1, 5)],
      availability: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required]
      }),
      addresses: this.fb.array([ this.buildAddress() ])
    });

    // Watch the notification control for changes
    this.addAnimalForm.get('notification').valueChanges
      .subscribe(value => this.setNotifications(value));

    // Watch the email group of controls for changes
    const emailControl = this.addAnimalForm.get('emailGroup.email');
    emailControl.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(emailControl));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  populateTestData(): void {
    this.addAnimalForm.setValue({
      name: 'Jack Straw',
      id: 'GRR1109',
      description: 'Wonderful animal and very friendly.',
      dateAdded: new Date(),
      dob: '2011-09-01'
    });
  }

  setNotifications(type: string): void {
    const description = this.addAnimalForm.get('description');
    if (type === 'email') {
      description.setValidators(Validators.required);
    } else {
      description.clearValidators();
    }
    description.updateValueAndValidity();
  }

  save() {
    console.log(this.addAnimalForm);
    console.log('Saved: ' + JSON.stringify(this.addAnimalForm.value));
  }
}
