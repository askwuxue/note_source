import { sum } from "../src/sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("sum(2, 4) 不等于 5", () => {
  expect(sum(2, 4)).not.toBe(5);
});
