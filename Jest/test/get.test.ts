import { get } from "../src/get";

test("测试嵌套对象存在的可枚举属性 line1", () => {
  expect(
    get(
      {
        id: 101,
        email: "jack@dev.com",
        personalInfo: {
          name: "Jack",
          address: {
            line1: "westwish st",
            line2: "washmasher",
            city: "wallas",
            state: "WX",
          },
        },
      },
      ["personalInfo", "address", "line1"]
    )
  ).toBe("westwish st");
});
