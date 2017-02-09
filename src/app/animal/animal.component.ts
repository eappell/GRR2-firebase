import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { IAnimal, Event, Photo, IProject, Status } from '../../common/model';
import { AnimalService } from '../services/animal.service';
import { UpdateAnimalComponent } from './update-animal/update-animal.component';

import {FirebaseAuth} from 'angularfire2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  public animal: IAnimal;
  public errorMessage: string;
  public isLoggedIn: boolean;  

  constructor (
    private animalService: AnimalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    @Inject(FirebaseAuth) public auth: FirebaseAuth
  ) { }

  getAnimal() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.animalService.getAnimal(id).subscribe(
        animal => { this.animal = animal; },
        error => this.errorMessage = <any>error
      );
    });
  }

  openUpdateAnimal() {
    const addAdnimalModalRef = this.modalService.open(UpdateAnimalComponent, { size: 'lg' });
    addAdnimalModalRef.componentInstance.animal = this.animal;
  }

  onBack(): void {
    this.router.navigate(['/animals']);
  }

  ngOnInit() {
    this.getAnimal();
  }
}
