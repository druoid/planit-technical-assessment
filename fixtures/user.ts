import { faker } from '@faker-js/faker';

export const user = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
};
