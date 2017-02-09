import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { AngularMasonry, MasonryOptions, MASONRY_DIRECTIVES } from 'angular2-masonry';
import { IProject, IAnimal, Event, Photo, Status } from '../../common/model';
import { ProjectService } from '../services/project.service';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public project: IProject;
  public errorMessage: string;
  public offspring;
  @ViewChild(AngularMasonry) private masonry: AngularMasonry;

  public masonryOptions: MasonryOptions = {
    transitionDuration: '0.5s',
    itemSelector: '.brick',
    gutter: 5,
    columnWidth: 10
  };

  constructor(
    private projectSvc: ProjectService,
    private animalSvc: AnimalService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) { }

  getProject() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.projectSvc.getProject(id).subscribe(
        project => { 
          this.project = project;
        },
        error => this.errorMessage = <any>error
      );
    });
  }

   filterOffspring (animal : IAnimal, projectKey: string) : boolean{
     // Return true if don't want this job in the results.
     // e.g. lets filter jobs with price < 25;
     return animal.productOfProject !== projectKey; 
  }
I
  onBack(): void {
    this.router.navigate(['/projects']);
  }

  ngOnInit() {
    this.getProject();
    this.offspring = this.animalSvc.getAnimals();
  }
}
