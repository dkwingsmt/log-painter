import { regularizeQuotes } from './postprocesses';

describe('regularizeQuotes', () => {
  it('Works for Chinese quotes', () => {
    expect(regularizeQuotes([
      '“123',
      '456”',
      '”123',
      '456“',
      '“123',
      '456“',
    ])).toMatchSnapshot();
  });

  it('Works for English quotes', () => {
    expect(regularizeQuotes([
      '"123',
      '456"',
    ])).toMatchSnapshot();
  });
});