/*
 * @Author: 邱狮杰
 * @Date: 2020-12-05 22:34:31
 * @LastEditTime: 2020-12-05 22:42:45
 * @FilePath: /backEnd-main/src/store/reducer/admin/reducer.ts
 * @Description: admin Status
 */
import { Map } from "immutable";
import { ADMIN_TOKEN } from "../../../constants/admin/admin";
type Action = {
  type: string;
  data: string;
};
const State: Map<string, string> = Map({
  token: "",
});
export function AdminToken(state = State, action: Action) {
  switch (action.type) {
    case ADMIN_TOKEN:
      return state.set("token", action.data);
    default:
      return state;
  }
}
