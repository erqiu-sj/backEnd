/*
 * @Author: 邱狮杰
 * @Date: 2020-12-05 23:29:16
 * @LastEditTime: 2020-12-06 10:43:52
 * @FilePath: /backEnd-main/src/utils/VerifySuperAdministrator.ts
 * @Description: 验证函数
 */
import { message, Modal } from "antd";
import { Admin } from "../http/admin/admin";
import * as ErrorMessage from "../message/error";
import * as SuccessMessage from "../message/success";

const { confirm } = Modal;

export function VerifySuperAdministrator(callback: (token: string) => void) {
  confirm({
    title: SuccessMessage.ADMIN_VERFIYFIRST,
    content: ErrorMessage.ADMIN_READONLY,
    cancelText: "关闭",
    okText: "验证",
    onOk: () => {
      const adminPassword = prompt("管理员密码是：");
      const result = Admin({
        url: "/checkUser",
        data: { Password: adminPassword },
      });
      result.then(
        (res: { data: { Result: string } }) => {
          // token
          callback(res.data.Result);
          message.success(SuccessMessage.ADMINLOGIN_SUCCESS);
        },
        () => message.warning(ErrorMessage.ADMINLOGIN_ERROR)
      );
    },
  });
}
