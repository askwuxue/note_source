import { fetchUser } from '../servers/fetchUser';

test('fetchUser() 可以请求到一个用户名字为 moji', async () => {
  const data =  await fetchUser();

  expect(data.name).toBe('moji')
})
