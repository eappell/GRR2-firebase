import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

import { Photo } from '../../common/model';

@Injectable()
export class PhotoService {
  photos: FirebaseListObservable<Photo[]>;
  constructor(private af: AngularFire) {
    this.photos = af.database.list('/photos');
  }

  getPhotos(): FirebaseListObservable<Photo[]> {
    return this.photos;
  }

  getPhoto(key: any): FirebaseObjectObservable<Photo> {
    return this.af.database.object(key);
  }

  addPhoto(photo: Photo) {
    return this.photos.push(photo);
  }

  deletPhoto(photo: any) {
    return this.photos.remove(photo);
  }
}
