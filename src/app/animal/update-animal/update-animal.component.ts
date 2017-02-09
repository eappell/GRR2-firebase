import { Component, OnInit, Input } from '@angular/core';
import { IAnimal } from '../../../common/model';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.css']
})
export class UpdateAnimalComponent implements OnInit {
  @Input() animal: IAnimal;
  public mask: Array<string | RegExp>;

  constructor(private _animalService: AnimalService) { }

  updateAnimal() {
    this._animalService.updateAnimal(this.animal.id, this.animal)
      .then(
        resolve => this.animalUpdated(resolve),
        error => this.errorUpdating(error)
      )
  }

  animalUpdated(status) {

  }

  errorUpdating(error) {

  }

  ngOnInit() {
    this.mask = ['$', /[1-9]/, /\d/, /\d?/, /\d?/];
  }

}
