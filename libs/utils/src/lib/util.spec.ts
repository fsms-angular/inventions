import { uniqueId } from './util';

describe('uniqueid', () => {
  it('should create create uniqueue id', () => {
    expect(uniqueId()).toBeDefined();
  });
});
