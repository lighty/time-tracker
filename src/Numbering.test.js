import numbering from './Numbering';

test('指定したkeyのmax値をインクリメントした値を返す', () => {
  const array = [{id: 1}, {id: 2}];
  expect(numbering(array)).toBe(3);
});
