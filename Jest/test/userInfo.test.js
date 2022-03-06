import { getUserInfo }  from '../src/userInfo.js';

test('getUserInfo()返回的对象深度相等', () => {
  expect(getUserInfo()).toEqual(getUserInfo());
})

test('getUserInfo()返回的对象内存地址不同', () => {
  expect(getUserInfo()).not.toBe(getUserInfo());
})

test("getUserInfo().name应该包括mo", () => {
  expect(getUserInfo().name).toMatch(/mo/i)
})