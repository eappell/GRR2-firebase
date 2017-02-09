import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { AnimalComponent } from './animal/animal.component';
import { AddAnimalComponent } from './animal/add-animal/add-animal.component';
import { AnimalsComponent } from './animals/animals.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'animal/:id', component: AnimalComponent, canActivate: [ AuthGuard ] },
  { path: 'animals/add', component: AddAnimalComponent, canActivate: [ AuthGuard ] },
  { path: 'animals', component: AnimalsComponent, canActivate: [ AuthGuard ] },
  { path: 'projects', component: ProjectsComponent, canActivate: [ AuthGuard ] },
  { path: 'project/:id', component: ProjectComponent, canActivate: [ AuthGuard ] },
  { path: 'customer', component: CustomerComponent, canActivate: [ AuthGuard ] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
