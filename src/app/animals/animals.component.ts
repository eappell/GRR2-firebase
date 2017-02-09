import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IAnimal, Event, Photo, IProject, Status } from '../../common/model';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/angularfire2';

import { UserService } from '../services/user.service';
import { AnimalService } from '../services/animal.service';
import { AngularMasonry, MasonryOptions, MASONRY_DIRECTIVES } from 'angular2-masonry';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  public isLoggedIn: boolean;
  public animals: IAnimal[];
  @ViewChild(AngularMasonry) private masonry: AngularMasonry;

  public masonryOptions: MasonryOptions = {
    transitionDuration: '0.5s',
    itemSelector: '.brick',
    gutter: 10
  };

  constructor(
    private animalService: AnimalService,
    private us: UserService,
    private router: Router) {
  }

  getAnimal(key: string) {
    this.animalService.getAnimal(key)
      .subscribe(results => {
        return results;
      });
  }

  addAnimal(animal: IAnimal) {
    console.log('popup add animal form');
    // this.animalService.addAnimal(animal)
    //   .then(results => { return results; })
    //   .catch(error => { return error; });
  }

  ngOnInit() {
    this.us.isAuthenticated().subscribe(status => this.isLoggedIn = status);
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      this.animalService.getAnimals().subscribe(
        results => { this.animals = results; },
        error => console.log(error)
      );
    }
  }
}
