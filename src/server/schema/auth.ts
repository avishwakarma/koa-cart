import AuthController from '../controller/AuthController';


const type = `
  type Sample {
    name: String
    email: String
  }
`;

const query = `
  sample: Sample
`;

const resolver = {
  type,
  query: {
    sample: AuthController.login
  }
}

export default {
  type,
  query,
  resolver
}