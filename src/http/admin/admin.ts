/*
 * @Author: 邱狮杰
 * @Date: 2020-12-05 21:59:49
 * @LastEditTime: 2020-12-05 22:08:50
 * @FilePath: /backEnd-main/src/http/admin/admin.ts
 * @Description: admin router
 */
import Axios, { AxiosRequestConfig } from "axios";
const adminHttp = Axios.create({
  baseURL: "http://localhost:8080/admin",
  timeout: 4000,
  method: "POST",
});
export function Admin(config: AxiosRequestConfig) {
  return adminHttp(config);
}
