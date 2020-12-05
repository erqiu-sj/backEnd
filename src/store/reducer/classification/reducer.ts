/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 17:17:12
 * @LastEditTime: 2020-12-05 14:36:40
 * @FilePath: /backEnd-main/src/store/reducer/classification/reducer.ts
 * @Description: 分类
 */
import {
  ActicleFrontendTypeList,
  ActicleBackendTypeList,
  ArticleMounth,
  ArticleYearList,
} from "./state";
import {
  ARTICLE_TYPE_FRONTEND,
  ARTICLE_TYPE_BACKEND,
  ARTICLE_TYPE_MOUTH,
  ARTICLE_TYPE_YEAR,
} from "../../../constants/classification/classification";
import { Map } from "immutable";
type Action = {
  type: string;
};
type StateType = Map<string, string[]>;
const State: StateType = Map({
  list: [],
});

// 返回前端typeList
export function GetArticleFrontendTypeList(
  state = State,
  action: Action
): StateType {
  switch (action.type) {
    case ARTICLE_TYPE_FRONTEND:
      return state.set("list", ActicleFrontendTypeList);
    default:
      return state;
  }
}
// 返回后端typeList
const backendState: StateType = Map({
  list: [],
});
export function GetArticleBackendTypeList(
  state = backendState,
  action: Action
) {
  switch (action.type) {
    case ARTICLE_TYPE_BACKEND:
      return state.set("list", ActicleBackendTypeList);
    default:
      return state;
  }
}
// 返回YearsList
const YearList: StateType = Map({
  list: [],
});
export function GetArticleYearList(state = YearList, action: Action) {
  switch (action.type) {
    case ARTICLE_TYPE_YEAR:
      return state.set("list", ArticleYearList);
    default:
      return state;
  }
}
// 返回Mounth
const MouthList: StateType = Map({
  list: [],
});
export function GetArticleMounthList(state = MouthList, action: Action) {
  switch (action.type) {
    case ARTICLE_TYPE_MOUTH:
      return state.set("list", ArticleMounth);
    default:
      return state;
  }
}
