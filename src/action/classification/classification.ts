/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 17:19:28
 * @LastEditTime: 2020-12-05 14:30:24
 * @FilePath: /backEnd-main/src/action/classification/classification.ts
 * @Description: 所有文章分类
 */
import {
  ARTICLE_TYPE_FRONTEND,
  ARTICLE_TYPE_BACKEND,
  ARTICLE_TYPE_MOUTH,
  ARTICLE_TYPE_YEAR,
} from "../../constants/classification/classification";

// 获取前端文章类型分类
export function GetArticleClassificationFrontendType() {
  return { type: ARTICLE_TYPE_FRONTEND };
}
//  获取后端文章类型分类
export function GetArticleClassificationBackendType() {
  return { type: ARTICLE_TYPE_BACKEND };
}
// 获取YearList
export function GetArticleYearsList() {
  return { type: ARTICLE_TYPE_YEAR };
}
// 获取MouthList
export function GetArticleMouthList() {
  return { type: ARTICLE_TYPE_MOUTH };
}
