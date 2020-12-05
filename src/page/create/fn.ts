/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 17:03:05
 * @LastEditTime: 2020-12-06 00:43:22
 * @FilePath: /backEnd-main/src/page/create/fn.ts
 * @Description: CreatePage逻辑
 */
import { Empty, ErrorHandling } from "../../utils/fn";
import { Create } from "../../http/create/create";
// import { Admin } from "../../http/admin/admin";
import { message, Modal } from "antd";
import { VerifySuperAdministrator } from "../../utils/VerifySuperAdministrator";
// const { confirm } = Modal;
/**
 * @description: 将文章数据发送给服务器
 * @param {string} val 标题
 * @param {string} content 文章内容
 * @param {string} articleType 文章类型
 * @return {*} void
 */
export function Send(val: string, content: string, articleType: string): void {
  ErrorHandling(
    () => {
      if (
        Empty(val, "标题为空") &&
        Empty(content, "内容为空") &&
        Empty(articleType, "文章类型为空")
      ) {
        Login(val, content, articleType);
      }
    },
    (e) => message.warning(e.message)
  );
}
async function Login(val: string, content: string, articleType: string) {
  try {
    // 验证token值是否为空
    const result = await Create({
      url: "/write",
      data: { val, content, articleType },
    });
    console.log(result);
  } catch (e) {
    VerifySuperAdministrator((ServerToken) => {
      console.log(ServerToken);
    });
  }
}
// function Incorrect() {
//   try {
//     confirm({
//       title: "请先认证管理员身份",
//       content: "您并没有可写权限..",
//       cancelText: "关闭",
//       okText: "验证",
//       onOk: async () => {
//         const adminPassword = prompt("管理员密码是：");
//         const result = await Admin({
//           url: "/checkUser",
//           data: { Password: adminPassword },
//         });
//         const { Result } = result.data;
//         console.log(Result);
//       },
//     });
//   } catch (e) {
//     message.warning("管理员密码错误");
//   }
// }
