import { config } from '../common/config';
import { firebaseSecret } from '../common/config-secret';
import { AddAnimalCommand, IAnimal, Photo, Event } from '../common/model';

let request = require('request');

module.exports = function (context, callback) {
    const animalsUrl = `${config.firebase.databaseURL}/animals.json?auth=${firebaseSecret}`;
    const command = <AddAnimalCommand>context.body;

    console.log(`Received command: ${JSON.stringify(command)}`);

    const animal: IAnimal = {
      description: command.animal.description,
      dob: command.animal.dob,
      fatherId: command.animal.fatherId,
      motherId: command.animal.motherId,
      gender: command.animal.gender,
      hatchColor: command.animal.hatchColor,
      locale: command.animal.locale,
      pedigree: command.animal.pedigree,
      price: command.animal.price,
      species: command.animal.species,
      speciesLatin: command.animal.speciesLatin,
      status: command.animal.status,
      name: command.animal.name,
      dateAdded: Date.now(),
      photos: new Array<Photo>(),
      events: new Array<Event>(),
      id: "-1"
    };

    const requestOptions = {
        method: 'POST',
        url: animalsUrl,
        json: animal
    };

    request(requestOptions, () => callback(null, "Finished"));
}
