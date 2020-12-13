/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 17:24:10
 * @LastEditTime: 2020-12-13 15:43:06
 * @FilePath: /backEnd-main/src/store/reducer/classification/state.ts
 * @Description: 分类content
 */
// 前端
export const ActicleFrontendTypeList = [
  "JavaScript",
  "TypeScript",
  "Css",
  "Echart", 
];
// 后端
export const ActicleBackendTypeList = ["Golang", "Mysql", "Redis"];
// 文章Year
export const ArticleYearList = ["2020", "2021"];
// 文章Mounth
export const ArticleMounth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
  (item) => `${item}月`
);
