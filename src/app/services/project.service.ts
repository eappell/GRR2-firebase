import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

import { IProject, Project, IAnimal } from '../../common/model';
import { AnimalService } from '../services/animal.service';

@Injectable()
export class ProjectService {
  projects: FirebaseListObservable<IProject[]>;
  constructor(private af: AngularFire, private animalSvc: AnimalService) {
    this.projects = af.database.list('/projects');
  }

  getProjects(): FirebaseListObservable<IProject[]> {
    return this.projects;
  }

  getProject(key: any): FirebaseObjectObservable<IProject> {
    return this.af.database.object('/projects/' + key);
  }

  addProject(project: IProject) {
    return this.projects.push(project);
  }

  deleteProject(project: any) {
    return this.projects.remove(project);
  }
}
