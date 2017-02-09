import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalService } from './services/animal.service';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';
import { PhotoService } from './services/photo.service';
import { AuthGuard } from './services/auth.guard';
import { AngularFireModule, AngularFireAuth, AuthMethods, AuthProviders } from 'angularfire2/angularfire2';
import { config } from '../common/config';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';

import { MasonryModule, MasonryOptions } from 'angular2-masonry';
import { MomentModule } from 'angular2-moment';
import { NgbModal, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule, AlertModule, ModalModule, TooltipModule } from 'ng2-bootstrap';

import { TruncatePipe } from '../common/truncate';
import { AnimalComponent } from './animal/animal.component';
import { AddAnimalComponent } from './animal/add-animal/add-animal.component';
import { UpdateAnimalComponent } from './animal/update-animal/update-animal.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerComponent } from './customer/customer.component';
import { ProjectComponent } from './project/project.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { UsersComponent } from './users/users.component';

const fbAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent,
    ProjectsComponent,
    HomeComponent,
    TruncatePipe,
    AnimalComponent,
    AddAnimalComponent,
    UpdateAnimalComponent,
    SignupComponent,
    CustomerComponent,
    LoginComponent,
    ProjectComponent,
    HomeCarouselComponent,
    UsersComponent
  ],
  providers: [
    AuthGuard,
    appRoutingProviders,
    AnimalService,
    ProjectService,
    NgbModal,
    UserService,
    PhotoService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    routing,
    MomentModule,
    MasonryModule,
    NgbModule.forRoot(),
    CarouselModule.forRoot(),
    AngularFireModule.initializeApp(config.firebase, fbAuthConfig)
  ],
  entryComponents: [
    LoginComponent,
    UpdateAnimalComponent,
    AddAnimalComponent
  ],
  exports: [TruncatePipe],
  bootstrap: [AppComponent]
})

export class AppModule {
  public masonryOptions: MasonryOptions = {
    transitionDuration: '0.8s',
    gutter: 35
  };
}
