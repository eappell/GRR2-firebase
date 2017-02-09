import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Injectable } from '@angular/core';

import { IAnimal } from '../../common/model';

@Injectable()
export class AnimalService {
  animals: FirebaseListObservable<IAnimal[]>;
  constructor(private af: AngularFire, private db: AngularFireDatabase) {
    this.animals = af.database.list('/animals');
  }

  getAnimals(): FirebaseListObservable<IAnimal[]> {
    return this.animals;
  }

  getAnimal(key: any): FirebaseObjectObservable<IAnimal> {
    return this.af.database.object('/animals/' + key);
  }

  addAnimal(animal: IAnimal) {
    return this.animals.push(animal);
  }

  updateAnimal(key: string, animal: IAnimal) {
    return this.animals.update(key, animal);
  }

  deleteAnimal(key: string) {
    return this.animals.remove(key);
  }
}
