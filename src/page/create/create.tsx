import React, { FC, useState } from "react";
import { Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { GetAdminToken } from "../../action/admin/adminAction";
import * as ErrorMessage from "../../message/error";
import { VerifySuperAdministrator } from "../../utils/VerifySuperAdministrator";
import { Empty, ErrorHandling } from "../../utils/fn";
import { Create } from "../../http/create/create";
import Title from "./components/title/Title";
import Editor from "../../components/Editor/Editor";
import GroupSelect from "./components/groupSelect/groupSelect";
type Props = {};
const CreatePage: FC<Props> = () => {
  // title内容
  const [val, setVal] = useState<string>("");
  // 文章内容
  const [content, setContent] = useState<string>("");
  // 文章类型
  const [articleType, setArticleType] = useState<string>("JavaScript");
  const tokenDispatch = useDispatch();
  const token = useSelector((state: { AdminToken: Map<string, string> }) =>
    state.AdminToken.get("token")
  );
  // 提交文章时
  function Send() {
    ErrorHandling(
      () => {
        if (
          Empty(val, "标题为空") &&
          Empty(content, "内容为空") &&
          Empty(articleType, "文章类型为空")
        )
          Login(val, content, articleType);
      },
      (e) => message.warning(e.message)
    );
  }
  // admin 登陆
  async function Login(val: string, content: string, articleType: string) {
    try {
      // token为空跳到catch分支
      if (!token) throw new Error(ErrorMessage.TOKEN_EMPTRY);
      // 验证token值是否为空
      const result = await Create({
        url: "/write",
        data: { val, content, articleType },
      });
      console.log(result);
    } catch (e) {
      // TODO: 此处报错无法捕获
      VerifySuperAdministrator((ServerToken) => {
        tokenDispatch(GetAdminToken(ServerToken));
      });
    }
  }
  return (
    <div className="create">
      <Title onProxyChange={(val) => setVal(val)} />
      <br />
      <div style={{ background: "#fff", borderRadius: "5px" }}>
        <Editor onProxyChange={(val) => setContent(val)} />
      </div>
      <br />
      <br />
      <GroupSelect onProxyChange={(val) => setArticleType(val)} />
      <br />
      <br />
      <Button onClick={Send} className="button">
        Send
      </Button>
    </div>
  );
};
export default CreatePage;
