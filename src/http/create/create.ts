/*
 * @Author: 邱狮杰
 * @Date: 2020-12-05 20:47:27
 * @LastEditTime: 2020-12-06 11:23:17
 * @FilePath: /backEnd-main/src/http/create/create.ts
 * @Description: http
 */
import Axios, { AxiosRequestConfig } from "axios";
export interface SendArticle {
  Title: string;
  Content: string;
  ArticleType: string;
  BriefIntroduction: string;
}

const http = Axios.create({
  baseURL: "http://localhost:8080/administratorsArticle",
  timeout: 4000,
  method: "POST",
});
export function Create(config: AxiosRequestConfig) {
  return http(config);
}
