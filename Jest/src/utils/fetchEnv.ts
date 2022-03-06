/**
 * 环境参数枚举
 */
enum IEnvEnum {
  DEV = "dev", // 开发
  TEST = "test", // 测试
  PRE = "pre", // 预发
  PROD = "prod", // 生产
}

/**
 * 根据链接获取当前环境参数
 * @param {string?} url 资源链接
 * @returns {IEnvEnum} 环境参数
 */
export function fetchEnv(url: string): IEnvEnum {
  const envs = [IEnvEnum.DEV, IEnvEnum.TEST, IEnvEnum.PRE];

  return envs.find((env) => url.includes(env)) || IEnvEnum.PROD;
}
