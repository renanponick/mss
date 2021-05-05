import { pathDeleteUser, pathLoginUser, pathUpdateUser } from "./api-doc/user";
import { pathGetDoctor, pathDoctor, pathUpdateDoctor } from "./api-doc/doctor";
import { pathGetPharmacy, pathPharmacy, pathUpdatePharmacy } from "./api-doc/pharmacy";

export const apiDoc = {
  swagger: "2.0",
  basePath: "/mss",
  info: {
    title: "Medical Support System.",
    description: 'Documentation abount Medical Support System API.',
    version: "1.0.0"
  },

  tags: [
    {
      name: 'user',
      description: 'Endpoints about the user'
    },
    {
      name: 'doctor',
      description: 'Endpoints about the doctors'
    },
    {
      name: 'patient',
      description: 'Endpoints about the patients.'
    },
    {
      name: 'pharmacy',
      description: 'Endpoints about the pharmacies.'
    },
    {
      name: 'prescription',
      description: 'Endpoints about the prescriptions.'
    }
  ],

  paths: {
    '/v1/signin': pathLoginUser,
    '/v1/updateUser/{userId}': pathUpdateUser,
    '/v1/delete/{userId}': pathDeleteUser,
    '/v1/doctor/{userId} ': pathGetDoctor,
    '/v1/doctor': pathDoctor,
    '/v1/doctor/{userId}': pathUpdateDoctor,
    '/v1/pharmacy/{userId} ': pathGetPharmacy,
    '/v1/pharmacy': pathPharmacy,
    '/v1/pharmacy/{userId}': pathUpdatePharmacy,
  }
}