import { fetchEnv } from "../src/utils/fetchEnv";

describe("fetchEnv", () => {
  it("判断是否 dev 环境", () => {
    expect(fetchEnv("https://www.imooc.dev.com/")).toBe("dev");
  });

  it("判断是否 test 环境", () => {
    expect(fetchEnv("https://www.imooc.test.com/")).toBe("test");
  });

  it("判断是否 pre 环境", () => {
    expect(fetchEnv("https://www.imooc.pre.com/")).toBe("pre");
  });

  it("判断是否 prod 环境", () => {
    expect(fetchEnv("https://www.imooc.prod.com/")).toBe("prod");
  });

  it("判断是否 prod 环境", () => {
    expect(fetchEnv("https://www.imooc.com/")).toBe("prod");
  });
});
