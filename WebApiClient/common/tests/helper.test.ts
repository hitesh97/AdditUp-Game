import * as mocha from 'mocha';
import * as chai from 'chai';
import { Helper } from '../src/helper';

// To execute the tests below "npm run tests"

describe('Unit test description', () => {
  it('should do something specific', () => {
    const h: Helper = new Helper();
    const result = h.add(2, 4);
    chai.assert.equal(result, 6);
  });
});
