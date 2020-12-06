/*
 * @Author: 邱狮杰
 * @Date: 2020-12-05 22:37:00
 * @LastEditTime: 2020-12-06 10:47:20
 * @FilePath: /backEnd-main/src/action/admin/adminAction.ts
 * @Description: admin
 */
import { ADMIN_TOKEN } from "../../constants/admin/admin";
export const GetAdminToken = (token: string) => {
  return { type: ADMIN_TOKEN, data: token };
};
