import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { config } from '../../common/config';
import { AddTaskCommand, Task, AddAnimalCommand, IAnimal } from '../../common/model';
import { AngularFireModule, FirebaseListObservable, AngularFire } from 'angularfire2/angularfire2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasks: FirebaseListObservable<Task[]>;

  constructor(public http: Http, angularFire: AngularFire) {
    this.tasks = angularFire.database.list('tasks');
   }

  addAnimal(animal: IAnimal) {
    const command: AddAnimalCommand = { animal };
    console.log(`Adding task: ${JSON.stringify(command)}`);
    this.http.post(config.addAnimalUrl, command).subscribe(
      () => console.log('Success'),
      error => alert(`Adding task failed with error ${error}`)
    );
  }

  ngOnInit() {
  }
}
