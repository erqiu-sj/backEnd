/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 15:06:27
 * @LastEditTime: 2020-12-13 16:24:49
 * @FilePath: /backEnd-main/src/store/reducer.ts
 * @Description: 合并所有reducer
 */
import { combineReducers } from "redux";
import {
  GetArticleFrontendTypeList,
  GetArticleBackendTypeList,
  GetArticleMounthList,
  GetArticleYearList,
} from "./reducer/classification/reducer";
import { AdminToken } from "./reducer/admin/reducer";
export default combineReducers({
  GetArticleFrontendTypeList,
  GetArticleBackendTypeList,
  GetArticleMounthList,
  GetArticleYearList,
  AdminToken,
});
