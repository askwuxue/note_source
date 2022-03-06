import { getIntArray }  from '../src/utils/getIntArray';

test('getIntArray(3)返回的数组长度应该为3', () => {
  expect(getIntArray(3)).toHaveLength(3);
})

// TODO 必须要先使用一层方法将抛出异常的方法包裹，否则会导致断言失败
const getIntArrayWrap = (params) => {
  getIntArray(params)
}

test('getIntArray参数不是数字', () => {
  getIntArrayWrap(3.3)
  expect(getIntArrayWrap).toThrow("getIntArray只接受整数类型的参数")
})
