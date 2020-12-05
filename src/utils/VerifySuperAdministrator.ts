/*
 * @Author: 邱狮杰
 * @Date: 2020-12-05 23:29:16
 * @LastEditTime: 2020-12-06 01:05:28
 * @FilePath: /backEnd-main/src/utils/VerifySuperAdministrator.ts
 * @Description: 验证函数
 */
import { message, Modal } from "antd";
import { Admin } from "../http/admin/admin";

const { confirm } = Modal;

export function VerifySuperAdministrator(callback: (token: string) => void) {
  try {
    confirm({
      title: "请先认证管理员身份",
      content: "您并没有可写权限..",
      cancelText: "关闭",
      okText: "验证",
      onOk: async () => {
        const adminPassword = prompt("管理员密码是：");
        const result = await Admin({
          url: "/checkUser",
          data: { Password: adminPassword },
        });
        // token
        const { Result } = result.data;
        callback(Result);
      },
    });
  } catch (e) {
    message.warning("管理员密码错误");
  }
}
