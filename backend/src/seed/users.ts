import fs from 'fs';
import path from 'path';

enum Sex {
  Male = "Male",
  Female = "Female",
}

type UserType = {
  email: string;
  password: string;
  admin: boolean;
  verified: boolean;
  first_name: string;
  last_name: string;
  sex: Sex;
  address: string;
  valid_id_type: string;
  birthday: Date;
  age: number;
  valid_id_pic: string;
};

const users: UserType[] = [
  {
    email: "john@gmail.com",
    password: "$2b$10$6sdkothEwAguhA0FytsGF.gcWPmTDB5hosif6rGX5FFJK8PdBgRHu",
    admin: true,
    verified: true,
    first_name: "admin",
    last_name: "user",
    sex: Sex.Male,
    address: "Manila PH",
    valid_id_type: "Postal ID",
    valid_id_pic: "logo192.png",
    birthday: new Date(1990, 0, 1),
    age: 21
  },
  {
    email: "liza@gmail.com",
    password: "$2b$10$70yLw0dPhAD0py/iiGUInO7kklGUmbMfa5BmXKGCXEID1ufTsqSQ6",
    admin: false,
    verified: true,
    first_name: "Liza",
    last_name: "Seguerra",
    sex: Sex.Female,
    address: "Tokyo JP",
    valid_id_type: "Birth certificate",
    valid_id_pic: "logo192.png",
    birthday: new Date(1985, 1, 12),
    age: 23
  },
  {
    email: "ben@gmail.com",
    password: "$2b$10$1DsQFSqUs3ufyDDRBd9wYuU5i9ihbnYR4GCYJsI3IzGXamwFWnr4S",
    admin: false,
    verified: true,
    first_name: "Ben",
    last_name: "Affleck",
    sex: Sex.Male,
    address: "California USA",
    valid_id_type: "Barangay ID",
    valid_id_pic: "logo192.png",
    birthday: new Date(1990, 2, 2),
    age: 30
  },
];

export default users;
