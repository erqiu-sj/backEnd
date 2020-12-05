/*
 * @Author: 邱狮杰
 * @Date: 2020-12-05 13:07:02
 * @LastEditTime: 2020-12-05 21:38:15
 * @FilePath: /backEnd-main/src/utils/fn.ts
 * @Description: 工具
 */
/**
 * @description: 验证输入的值是否为空，空则抛出错误
 * @param {string} val 需要被验证的值
 * @param {string} errMsg 报错输出的值
 * @return {*} void
 */
export function Empty(val: string, errMsg: string) {
  if (!val) throw new Error(errMsg);
  return true;
}
/**
 * @description: 错误处理
 * @param {*} business 正确逻辑
 * @param {*} errHandle 错误逻辑
 * @return {*} void
 */
export function ErrorHandling(
  business: () => void,
  errHandle: (e: { message: string }) => void
): void {
  try {
    business();
  } catch (e) {
    errHandle(e);
  }
}
