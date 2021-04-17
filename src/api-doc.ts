import { pathUserEx } from "./api-doc/doctor";

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
    '/v1/ex': pathUserEx,
  }
}