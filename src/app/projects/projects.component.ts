import { Component, OnInit, ViewChild } from '@angular/core';
import { IAnimal, Event, Photo, IProject, Status } from '../../common/model';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/angularfire2';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { AngularMasonry, MasonryOptions, MASONRY_DIRECTIVES } from 'angular2-masonry';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

 public projects: FirebaseListObservable<IProject[]>;
  @ViewChild(AngularMasonry) private masonry: AngularMasonry;

  public masonryOptions: MasonryOptions = {
    transitionDuration: '0.5s',
    itemSelector: '.brick',
    gutter: 10
  };

  constructor(private projectService: ProjectService, private sanitizer: DomSanitizer) {
    let projects = projectService.getProjects().map(
      projects => projects.sort((a,b) => b.DateStart - a.DateStart)) as FirebaseListObservable<IProject[]>;
      
    this.projects = projects;
  }

  getProject(key: string) {
    this.projectService.getProject(key)
      .subscribe(results => {
        return results;
      });
  }

  addProject(project: IProject) {
    this.projectService.addProject(project)
      .then(results => { return results; })
      .catch(error => { return error; });
  }

  ngOnInit() {
  }

}
