export interface AddTaskCommand {
    content: string;
}

export interface Task {
    content: string;
    created: number;
}

export interface AddAnimalCommand {
  animal: IAnimal
}

export interface IAnimal {
  dateAdded: Date;
  description: string;
  dob: Date;
  fatherId: string;
  gender: string;
  hatchColor: string;
  id: string;
  locale: string;
  motherId: string;
  name: string;
  pedigree: string;
  photos: Photo[];
  events: Event[];
  price: number;
  species: string;
  speciesLatin: string;
  status: Status;
  productOfProject: string;
}

export class Animal implements IAnimal {
  dateAdded: Date;
  description: string;
  dob: Date;
  fatherId: string;
  gender: string;
  hatchColor: string;
  id: string;
  locale: string;
  motherId: string;
  name: string;
  pedigree: string;
  photos: Photo[];
  events: Event[];
  price: number;
  species: string;
  speciesLatin: string;
  status: Status;
  productOfProject: string;

  constructor(
    dateAdded = new Date(),
    description = '',
    dob: Date = new Date(),
    id = '',
    name = '',
    species = '',
    speciesLatin = '',
    status = Status.InCollection
  ) { }
}

export interface Photo {
  id: string;
  caption: string;
  filename: string;
}

export interface Event {
      Date: Date;
      Title: string;
      Quantity: number;
      Description: string;
      Type: EventType;
      Animal: IAnimal;
      Project: IProject;
}

export interface User {
    username: string; // required, must be 5-8 characters
    email: string; // required, must be valid email format
    password: string; // required, value must be equal to confirm password.
    confirmPassword: string; // required, value must be equal to password.
}

export interface IProject {
  DateStart: Date;
  DateHatch: Date;
  DateLaid: Date;
  IncubationType: IncubationType;
  Description: string;
  EggsTotal: number;
  EggsSlugs: number;
  EggsFertile: number;
  EggsInfertile: number;
  EggsQuestionable: number;
  EggsHatched: number;
  Dam: IAnimal;
  Sire: IAnimal;
  Offspring: IAnimal[];
}

export class Project implements IProject {
  DateStart: Date;
  DateHatch: Date;
  DateLaid: Date;
  IncubationType: IncubationType;
  Description: string;
  EggsTotal: number;
  EggsSlugs: number;
  EggsFertile: number;
  EggsInfertile: number;
  EggsQuestionable: number;
  EggsHatched: number;
  Dam: IAnimal;
  Sire: IAnimal;
  Offspring: IAnimal[];
}

export interface EventType {
  Name: string;
  Category: EventCategory;
}

export const enum IncubationType {
  Maternal,
  Artificial,
  Combination,
  Other
}

export const enum EventCategory {
  Feeding = 1,
  Breeding = 2,
  Husbandry = 3,
  Health = 4,
  BodilyFunctions = 5,
  Miscellaneous = 6
}

export const enum Status {
  InCollection,
  Deceased,
  Sold,
  PaymentHold,
  FeedingHold,
  Holdback,
  BreedingLoan,
  Available
}
