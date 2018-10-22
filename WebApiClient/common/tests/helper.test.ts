import * as mocha from 'mocha';
import * as chai from 'chai';
import { AddUpService } from '../src/AddUpService';

// To execute the tests below "npm run tests"

describe('Unit test description', () => {
  it('should do something specific', () => {
    const h: AddUpService = new AddUpService();
    const result = h.getNewQuestion();
    // chai.assert.equal(result, );
  });
});
